import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import { bucket } from '@lib/firebase'
import { createHash } from 'crypto'
import { encode } from 'blurhash'

const FIREBASE_STORAGE_FOLDER = process.env.NODE_ENV === 'production' ? 'payloads' : 'payloads-dev'
const MAX_IMAGE_DIMENSION = 1200
const THUMBNAIL_DIMENSION = 320

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/migrate-blurhash',
      method: 'get',
      handler: async (req) => {
        try {
          // 1. หาภาพที่ยังไม่มี blurhash และต้องเป็นไฟล์รูปภาพเท่านั้น
          const mediaToUpdate = await req.payload.find({
            collection: 'media',
            where: {
              and: [{ blurhash: { exists: false } }, { mimeType: { contains: 'image/' } }],
            },
            limit: 50, // ทำทีละ 50 รูปภาพเพื่อป้องกัน Memory เต็ม (ถ้ามีเยอะให้ยิง API นี้ซ้ำๆ)
          })

          let successCount = 0
          let errorCount = 0

          for (const doc of mediaToUpdate.docs) {
            try {
              // ข้ามถ้าไม่มี bucketPath
              const bucketPath = doc.bucketPath
              if (!bucketPath) continue

              // 2. โหลดไฟล์จาก Firebase กลับมาเป็น Buffer
              const file = bucket.file(bucketPath)
              const [exists] = await file.exists()
              if (!exists) continue

              const [fileBuffer] = await file.download()

              // 3. นำ Buffer มาสร้าง Blurhash
              // ใช้ resolveWithObject เพื่อเอาทั้ง Buffer และ info (ขนาดกว้างยาวใหม่)
              const { data: pixels, info } = await sharp(fileBuffer)
                .resize(16, 16, { fit: 'inside' })
                .ensureAlpha() // บังคับให้เป็น RGBA (4 channels) เสมอ
                .raw()
                .toBuffer({ resolveWithObject: true })

              // ใช้ info.width และ info.height จากภาพที่ย่อแล้ว
              const blurhashString = encode(
                new Uint8ClampedArray(pixels),
                info.width,
                info.height,
                4, // componentX
                4, // componentY
              )

              // 4. อัปเดตข้อมูลกลับเข้า Database
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: {
                  blurhash: blurhashString,
                },
              })
              console.log(`Updated doc ID ${doc.id} with blurhash.`)

              successCount++
            } catch (err) {
              console.error(`Error processing doc ID ${doc.id}:`, err)
              errorCount++
            }
          }

          // สำหรับ Payload v3 / Next.js
          return Response.json({
            message: 'Migration completed for this batch.',
            processed: successCount,
            errors: errorCount,
            remaining: mediaToUpdate.totalDocs - successCount - errorCount,
          })

          // สำหรับ Payload v2 / Express
          // return res.status(200).json({ ... })
        } catch (error) {
          console.error('Migration failed:', error)
          return Response.json({ error: 'Migration failed' }, { status: 500 })
        }
      },
    },
    {
      path: '/migrate-thumbnail',
      method: 'get',
      handler: async (req) => {
        try {
          const mediaToUpdate = await req.payload.find({
            collection: 'media',
            where: {
              and: [{ thumbnailURL: { exists: false } }, { mimeType: { contains: 'image/' } }],
            },
            limit: 50,
          })

          let successCount = 0
          let errorCount = 0

          for (const doc of mediaToUpdate.docs) {
            try {
              const bucketPath = doc.bucketPath
              if (!bucketPath) continue

              const file = bucket.file(bucketPath)
              const [exists] = await file.exists()
              if (!exists) continue

              const [fileBuffer] = await file.download()

              const thumbnailData = await sharp(fileBuffer)
                .resize(THUMBNAIL_DIMENSION, THUMBNAIL_DIMENSION, {
                  fit: 'inside',
                  withoutEnlargement: true,
                })
                .ensureAlpha()
                .webp({ quality: 80 })
                .toBuffer()

              const filename = bucketPath.split('/').pop() ?? `${doc.id}`
              const smallFilename = `${filename.replace(/\.[^.]+$/, '')}_thumb.webp`
              const smallBucketPath = `${FIREBASE_STORAGE_FOLDER}/thumbnails/${smallFilename}`
              const smallFile = bucket.file(smallBucketPath)
              await smallFile.save(thumbnailData, {
                metadata: { contentType: 'image/webp' },
              })

              const [smallURL] = await smallFile.getSignedUrl({
                action: 'read',
                expires: '03-01-2500',
              })

              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: { smallURL, smallBucketPath },
              })
              console.log(`Updated doc ID ${doc.id} with small image.`)

              successCount++
            } catch (err) {
              console.error(`Error processing doc ID ${doc.id}:`, err)
              errorCount++
            }
          }

          return Response.json({
            message: 'Small image migration completed for this batch.',
            processed: successCount,
            errors: errorCount,
            remaining: mediaToUpdate.totalDocs - successCount - errorCount,
          })
        } catch (error) {
          console.error('Small image migration failed:', error)
          return Response.json({ error: 'Small image migration failed' }, { status: 500 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'alt',
      label: 'Alt Text (คำอธิบายภาพ สำหรับ SEO และผู้ใช้ที่ใช้ screen reader)',
      type: 'text',
      required: true,
    },
    {
      name: 'firebaseURL',
      label: 'Firebase URL',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
      },
    },
    {
      name: 'thumbnailURL',
      label: 'Thumbnail URL',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
      },
    },
    {
      name: 'smallURL',
      label: 'Small Image URL',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
      },
    },
    {
      name: 'smallBucketPath',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
      },
    },
    {
      name: 'bucketPath',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
      },
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        disableListColumn: true,
        hidden: true,
        readOnly: true,
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => (typeof doc.smallURL === 'string' ? doc.smallURL : null),
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        try {
          if (req.file) {
            const isImage = req.file.mimetype.startsWith('image/')
            const hash = createHash('sha256').update(req.file.data).digest('hex')
            let ext = req.file.name.split('.').pop()
            let fileData: Buffer = req.file.data
            let mimeType: string = req.file.mimetype

            if (isImage) {
              const image = sharp(fileData)
              const metadata = await image.metadata()
              const needsResize =
                (metadata.width && metadata.width > MAX_IMAGE_DIMENSION) ||
                (metadata.height && metadata.height > MAX_IMAGE_DIMENSION)

              if (needsResize) {
                fileData = await image
                  .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
                    fit: 'inside',
                    withoutEnlargement: true,
                  })
                  .ensureAlpha()
                  .webp({ quality: 80, alphaQuality: 80 })
                  .toBuffer()
                const resizedMeta = await sharp(fileData).metadata()
                req.file.size = fileData.length
                data.filesize = fileData.length
                data.width = resizedMeta.width ?? metadata.width
                data.height = resizedMeta.height ?? metadata.height
                // Always set to webp since .webp() conversion is applied
                mimeType = 'image/webp'
                ext = 'webp'
              }
            }

            req.file.name = `${hash}.${ext}`
            req.file.mimetype = mimeType
            data.filename = req.file.name
            data.mimeType = mimeType

            const bucketPath = `${FIREBASE_STORAGE_FOLDER}/${data.filename}`
            // check if file already exists in bucket
            const file = bucket.file(bucketPath)
            const [exists] = await file.exists()
            if (exists) {
              console.log(`File already exists in Firebase Storage: ${bucketPath}`)
            } else {
              await file.save(fileData, {
                metadata: {
                  contentType: mimeType,
                },
              })
            }
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: '03-01-2500',
            })
            data.firebaseURL = url
            data.bucketPath = bucketPath

            if (isImage) {
              const smallFilename = `${hash}_thumb.webp`
              const smallBucketPath = `${FIREBASE_STORAGE_FOLDER}/thumbnails/${smallFilename}`
              const smallFile = bucket.file(smallBucketPath)
              const [smallExists] = await smallFile.exists()
              if (!smallExists) {
                const smallData = await sharp(fileData)
                  .resize(THUMBNAIL_DIMENSION, THUMBNAIL_DIMENSION, {
                    fit: 'inside',
                    withoutEnlargement: true,
                  })
                  .ensureAlpha()
                  .webp({ quality: 80 })
                  .toBuffer()
                await smallFile.save(smallData, {
                  metadata: { contentType: 'image/webp' },
                })
              }
              const [smallURL] = await smallFile.getSignedUrl({
                action: 'read',
                expires: '03-01-2500',
              })
              data.smallURL = smallURL
              data.smallBucketPath = smallBucketPath
            }

            if (!data.blurhash && isImage) {
              const { width, height } = await sharp(fileData).metadata()
              if (width && height) {
                const resizedForBlurhash = await sharp(fileData)
                  .resize(16, 16, { fit: 'inside' })
                  .raw()
                  .toBuffer()
                data.blurhash = encode(
                  new Uint8ClampedArray(resizedForBlurhash),
                  width,
                  height,
                  4,
                  4,
                )
              }
            }
          }
          return data
        } catch (error) {
          console.error('Error uploading file to Firebase Storage:', error)
          return data
        }
      },
    ],
    afterRead: [
      async ({ doc }) => {
        // Override the URL with Firebase URL
        if (doc.firebaseURL) {
          doc.url = doc.firebaseURL
        }
        return doc
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        try {
          const doc = await req.payload.findByID({
            collection: 'media',
            id,
          })
          const bucketPath = (doc as unknown as Record<string, unknown>).bucketPath as
            | string
            | undefined
          if (bucketPath) {
            const file = bucket.file(bucketPath)
            await file.delete()
            console.log(`Deleted file from Firebase Storage: ${bucketPath}`)
          }
          const smallBucketPath = (doc as unknown as Record<string, unknown>).smallBucketPath as
            | string
            | undefined
          if (smallBucketPath) {
            const smallFile = bucket.file(smallBucketPath)
            await smallFile.delete()
            console.log(`Deleted small image from Firebase Storage: ${smallBucketPath}`)
          }
        } catch (error) {
          console.error('Error deleting file from Firebase Storage:', error)
        }
      },
    ],
  },
}
