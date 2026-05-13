import type { CollectionConfig } from 'payload'

export const Ingredients: CollectionConfig = {
  slug: 'ingredients',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'cost'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'cost',
      label: 'Cost per Gram/ML',
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
      admin: {
        components: {
          Cell: '@/components/UploadImageCell',
        },
      },
    },
  ],
}
