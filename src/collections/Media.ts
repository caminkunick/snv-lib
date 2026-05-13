import type { CollectionConfig } from 'payload'
import fs from 'fs'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/thumbnail/:id',
      method: 'get',
      handler: async (req) => {
        const id = String(req.routeParams?.id || '')
        const file = await req.payload.findByID({
          collection: 'media',
          id,
        })
        if (!file) {
          return Response.json({ error: 'File not found' }, { status: 404 })
        }
        const filePath = path.join(process.cwd(), 'media', file.filename!)
        if (!fs.existsSync(filePath)) {
          return Response.json({ error: 'File not found on server' }, { status: 404 })
        }
        const buffer = fs.readFileSync(filePath)
        return new Response(buffer, {
          headers: {
            'Content-Type': file.mimeType || 'application/octet-stream',
          },
        })
      },
    },
  ],
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
