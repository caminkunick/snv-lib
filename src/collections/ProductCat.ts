import type { CollectionConfig } from 'payload'
import { firestore } from '@lib/firebase'

export const ProductCat: CollectionConfig = {
  slug: 'product-cats',
  endpoints: [
    {
      path: '/cron',
      method: 'get',
      handler: async ({ payload }) => {
        const docs = await firestore.collection('category').get()

        const exists = await payload.find({
          collection: 'product-cats',
          pagination: false,
        })

        

        return Response.json(
          {
            message: 'Cron job executed successfully',
            docs: docs.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          },
        )
      },
    },
  ],
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'General',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Label (EN)',
              type: 'text',
              required: true,
            },
            {
              name: 'label_th',
              label: 'Label (TH)',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'desc',
              label: 'Description (EN)',
              type: 'textarea',
            },
            {
              name: 'desc_th',
              label: 'Description (TH)',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Catelog',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'bakery',
              label: 'Bakery',
              type: 'checkbox',
            },
            {
              name: 'beverage',
              label: 'Beverage',
              type: 'checkbox',
            },
          ],
        },
        {
          name: 'style',
          label: 'Style',
          type: 'select',
          options: [
            { label: 'Card', value: 'card' },
            { label: 'List', value: 'list' },
            { label: 'Table', value: 'table' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Images',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image_cover',
              label: 'Cover Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_cover_th',
              label: 'Cover Image (TH)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_icon',
              label: 'Icon Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_catalogcover',
              label: 'Catalog Cover Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_store_en',
              label: 'Store Image (EN)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_store_th',
              label: 'Store Image (TH)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_recipe',
              label: 'Recipe Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_gtk',
              label: 'GTK Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'image_gtk_th',
              label: 'GTK Image (TH)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Others',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'lastpagegfx',
              label: 'Last Page Graphics',
              type: 'checkbox',
            },
            {
              name: 'showonback',
              label: 'Show on Back Page',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
  ],
}

// export interface Params {
//   id: string
//   image_cover: string
//   image_cover_th: string
//   image_icon: string
//   image_catalogcover: string
//   image_store_en: string
//   image_store_th: string
//   image_recipe: string
//   image_gtk: string
//   image_gtk_th: string
//   slogan: string
//   footer: string
//   eweight: string
//   sort: number
//   bakery_excludes: string
//   beverage_excludes: string
//   custom_pages: { url: string; lang: string }[]
//   emkt_size: string
//   emkt_promo: string
//   servingsPerUnit: string
// }
