import type { CollectionConfig, FieldHookArgs } from 'payload'
import { firestore } from '@lib/firebase'
import { Product } from '@/libs/products'

const validateString = ({ value }: FieldHookArgs<any, any, any>) => {
  if (value !== null && value !== undefined) {
    return String(value)
  }
  return value
}

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'name_th'],
  },
  endpoints: [
    {
      path: '/cron',
      method: 'get',
      handler: async (req) => {
        let debug: any = null
        try {
          let stat = { total: 0, updated: 0, created: 0 }
          const firebaseProducts = await firestore
            .collection('products')
            .get()
            .then((snapshot) =>
              snapshot.docs.map((doc) => new Product({ firebaseId: doc.id, ...doc.data() })),
            )

          // get all products from req
          const products = await req.payload.find({
            collection: 'products',
            pagination: false,
            depth: 2,
          })

          const BATCH_SIZE = 50
          for (let i = 0; i < firebaseProducts.length; i += BATCH_SIZE) {
            const batch = firebaseProducts.slice(i, i + BATCH_SIZE)
            await Promise.all(
              batch.map((firebaseProduct) => {
                const existingProduct = products.docs.find(
                  (product) => product.firebaseId === firebaseProduct.firebaseId,
                )
                debug = { existingProduct, firebaseProduct }
                const { id: _id, ...productData } = firebaseProduct as any
                stat.total++
                if (existingProduct) {
                  // update existing product
                  stat.updated++
                  return req.payload.update({
                    collection: 'products',
                    id: existingProduct.id,
                    data: productData,
                  })
                } else {
                  stat.created++
                  // create new product
                  return req.payload.create({
                    collection: 'products',
                    data: productData,
                  })
                }
              }),
            )
          }

          return Response.json(
            { message: 'This is a custom endpoint for products', stat },
            {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
            },
          )
        } catch (error: any) {
          console.error('Error in /api/products/cron:', error?.message || error)
          console.dir(debug, { depth: null })
          return Response.json(
            { message: 'Error occurred while processing products', error: error?.message || error },
            {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              status: 500,
            },
          )
        }
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      hidden: true,
    },
    {
      name: 'firebaseId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        disabled: true,
      },
    },
    {
      name: 'sku',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          hooks: {
            beforeValidate: [validateString],
          },
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'name_th',
      label: 'ชื่อ',
      type: 'text',
    },
    {
      name: 'unit',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'price',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'number',
        },
      ],
    },
    {
      name: 'cat',
      type: 'text',
    },
    {
      name: 'tag',
      type: 'text',
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        components: {
          Cell: '@/components/ImageCell',
        },
      },
    },
    {
      name: 'visibility',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
        { label: 'Trash', value: 'trash' },
      ],
    },
    {
      name: 'size',
      type: 'text',
    },
    {
      name: 'color_emarket',
      type: 'text',
    },
    {
      name: 'desc_emarket',
      type: 'text',
    },
    {
      name: 'slogan',
      type: 'text',
    },
    {
      name: 'image_fruit',
      type: 'text',
    },
    {
      name: 'emkt_offsetLeft',
      type: 'text',
    },
    {
      name: 'offset_thumb_size',
      type: 'text',
    },
    {
      name: 'color_bg',
      type: 'text',
    },
    {
      name: 'color_primary',
      type: 'text',
    },
    {
      name: 'color_secondary',
      type: 'text',
    },
    {
      name: 'emkt_scale',
      type: 'text',
    },
    {
      name: 'freezing_temp',
      type: 'text',
    },
    {
      name: 'emkt_size',
      type: 'text',
    },
    {
      name: 'refrigerate_time',
      type: 'text',
    },
    {
      name: 'offset_thumb_top',
      type: 'text',
    },
    {
      name: 'freezing_time',
      type: 'text',
    },
    {
      name: 'instruction',
      type: 'text',
    },
    {
      name: 'refrigerate_temp',
      type: 'text',
    },
    {
      name: 'emkt_flavor',
      type: 'text',
    },
    {
      name: 'emkt_fruit_scale',
      type: 'text',
    },
    {
      name: 'image_emarket',
      type: 'text',
    },
    {
      name: 'image_app',
      type: 'text',
    },
    {
      name: 'emkt_weight',
      type: 'text',
    },
    {
      name: 'catalog',
      type: 'checkbox',
    },
    {
      name: 'servingsPerUnit',
      type: 'text',
    },
    {
      name: 'emkt_promo',
      type: 'text',
    },
    {
      name: 'desc_th',
      type: 'text',
    },
    {
      name: 'ex_weight',
      type: 'text',
    },
    {
      name: 'ex_qty',
      type: 'text',
    },
    {
      name: 'desc_en2',
      type: 'text',
    },
    {
      name: 'emkt_title',
      type: 'text',
    },
    {
      name: 'emkt_show_promo',
      type: 'checkbox',
    },
    {
      name: 'ex_weight_total',
      type: 'text',
    },
    {
      name: 'enlarge',
      type: 'checkbox',
    },
    {
      name: 'desc_th2',
      type: 'text',
    },
    {
      name: 'emkt_offsetTop',
      type: 'text',
    },
    {
      name: 'desc',
      type: 'text',
    },
  ],
}
