'use server'

import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Recipe } from '@/libs/recipes'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Table, TableRowData } from './table'

const PageRecipe = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    throw new Error('Unauthorized')
  }

  const recipe = await payload
    .findByID({
      collection: 'recipes',
      id,
    })
    .then((data) => new Recipe(data as any))
    .catch((err) => {
      console.error('Error fetching recipe:', err)
      return null
    })
  const content = recipe?.method as unknown as SerializedEditorState

  return (
    <div>
      <h1>{recipe?.title}</h1>
      {/* <pre>{JSON.stringify(recipe?.method, null, 2)}</pre> */}
      <RichText data={content} />
      <Table
        rows={([] as TableRowData[]).concat(
          recipe?.ingredients.map(
            (i) =>
              ({
                id: i.id,
                name: i.product.name,
                qty: i.quantity,
                image: i.product.image,
              }) as TableRowData,
          ) || [],
        )}
      />
    </div>
  )
}

export default PageRecipe
