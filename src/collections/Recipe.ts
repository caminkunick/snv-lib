import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
  },
  fields: [
    {
      label: 'General',
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'title_th',
              label: 'Thai Title',
              type: 'text',
            },
          ],
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
        },
        {
          name: 'method',
          type: 'richText',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Master', value: 'master' },
            { label: 'Sub', value: 'sub' },
          ],
          defaultValue: 'master',
        },
      ],
    },
    {
      label: 'Ingredients',
      type: 'collapsible',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'ingredients',
          label: 'Synova Products',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  required: true,
                },
                {
                  name: 'quantity',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'unit',
                  type: 'select',
                  options: [
                    { label: 'g', value: 'g' },
                    { label: 'ml', value: 'ml' },
                  ],
                  defaultValue: 'g',
                },
              ],
            },
          ],
        },
        {
          name: 'otherIngredients',
          label: 'Other Ingredients',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'subIngredient',
                  type: 'relationship',
                  relationTo: 'ingredients',
                  required: true,
                },
                {
                  name: 'quantity',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'unit',
                  type: 'select',
                  options: [
                    { label: 'g', value: 'g' },
                    { label: 'ml', value: 'ml' },
                  ],
                  defaultValue: 'g',
                },
              ],
            },
          ],
        },
        {
          name: 'subRecipes',
          label: 'Sub Recipes',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'recipe',
                  type: 'relationship',
                  relationTo: 'recipes',
                  required: true,
                  filterOptions: {
                    type: {
                      equals: 'sub',
                    },
                  },
                },
                {
                  name: 'quantity',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'unit',
                  type: 'select',
                  options: [
                    { label: 'g', value: 'g' },
                    { label: 'ml', value: 'ml' },
                  ],
                  defaultValue: 'g',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Others',
      type: 'collapsible',
      fields: [
        {
          name: 'expiration',
          label: 'Expiration',
          type: 'text',
        },
        {
          name: 'clients',
          label: 'Clients',
          type: 'array',
          fields: [
            {
              name: 'client',
              type: 'relationship',
              relationTo: 'clients',
            },
          ],
        },
        {
          name: 'categories',
          label: 'Category',
          type: 'array',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      (req) => {
        if (req.doc?.id) {
          revalidatePath(`/recipes/${req.doc?.id}`)
        }
      },
    ],
  },
}
