export interface ImageType {
  id: number
  alt: string
  firebaseURL: string
  smallURL: string
  smallBucketPath: string
  bucketPath: string
  blurhash: any
  updatedAt: string
  createdAt: string
  url: string
  thumbnailURL: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
}

export class ImagePayload implements ImageType {
  id: number = 0
  alt: string = ''
  firebaseURL: string = ''
  smallURL: string = ''
  smallBucketPath: string = ''
  bucketPath: string = ''
  blurhash: any = null
  updatedAt: string = ''
  createdAt: string = ''
  url: string = ''
  thumbnailURL: string = ''
  filename: string = ''
  mimeType: string = ''
  filesize: number = 0
  width: number = 0
  height: number = 0
  focalX: number = 0
  focalY: number = 0

  constructor(data?: Partial<ImageType>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
