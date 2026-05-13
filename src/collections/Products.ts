import type { CollectionConfig, FieldHookArgs } from 'payload'
import { firestore } from '@lib/firebase'

const arrayFields = ['sku', 'unit', 'price']

const transformFirebaseProduct = (product: Record<string, any>) => {
  const transformed: Record<string, any> = { ...product }
  for (const field of arrayFields) {
    if (Array.isArray(transformed[field])) {
      transformed[field] = transformed[field].map((item: any) =>
        typeof item === 'object' && item !== null ? item : { value: item },
      )
    }
  }
  return transformed
}

const allowedKeys = [
  'firebaseId',
  'sku',
  'name',
  'name_th',
  'unit',
  'price',
  'cat',
  'tag',
  'image',
  'visibility',
  'size',
  'color_emarket',
  'desc_emarket',
  'slogan',
  'image_fruit',
  'emkt_offsetLeft',
  'offset_thumb_size',
  'color_bg',
  'color_primary',
  'color_secondary',
  'emkt_scale',
  'freezing_temp',
  'emkt_size',
  'refrigerate_time',
  'offset_thumb_top',
  'freezing_time',
  'instruction',
  'refrigerate_temp',
  'emkt_flavor',
  'emkt_fruit_scale',
  'image_emarket',
  'image_app',
  'emkt_weight',
  'catalog',
  'servingsPerUnit',
  'emkt_promo',
  'desc_th',
  'ex_weight',
  'ex_qty',
  'desc_en2',
]

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
    defaultColumns: ['image', 'name', 'name_th'],
  },
  endpoints: [
    {
      path: '/cron',
      method: 'get',
      handler: async (req) => {
        try {
          const firebaseProducts = await firestore
            .collection('products')
            .get()
            .then((snapshot) => snapshot.docs.map((doc) => ({ firebaseId: doc.id, ...doc.data() })))

          // get all products from req
          const products = await req.payload.find({
            collection: 'products',
            pagination: false,
            depth: 2,
          })

          for (const firebaseProduct of firebaseProducts) {
            const existingProduct = products.docs.find(
              (product) => product.firebaseId === firebaseProduct.firebaseId,
            )
            // allow only allowed keys to be updated
            const filteredFirebaseProduct = transformFirebaseProduct(
              Object.fromEntries(
                Object.entries(firebaseProduct).filter(([key]) => allowedKeys.includes(key)),
              ),
            )
            if (existingProduct) {
              // update existing product
              await req.payload.update({
                collection: 'products',
                id: existingProduct.id,
                data: filteredFirebaseProduct,
              })
            } else {
              // create new product
              await req.payload.create({
                collection: 'products',
                data: filteredFirebaseProduct as any,
              })
            }
          }

          const updatedProducts = await req.payload.find({
            collection: 'products',
            pagination: false,
            depth: 2,
          })

          return Response.json(
            { message: 'This is a custom endpoint for products', products: updatedProducts },
            {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
            },
          )
        } catch (error: any) {
          console.error('Error in /api/products/cron:', error)
          return Response.json(
            { message: 'Error occurred while processing products', error: error.message },
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
