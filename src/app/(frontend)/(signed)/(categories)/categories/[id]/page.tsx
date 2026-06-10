'use server'

import { ContentHeader } from '@/components/content.header'
import { NotFound } from '@/components/not.found'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { GridCat } from '../grid.cat'
import { Category, Recipe } from '@/payload-types'
import { GridList } from '@/components/grid.list'
import { Box, Typography } from '@mui/material'

const PageCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const payload = await getPayload({ config: payloadConfig })
  const category = await payload
    .findByID({
      collection: 'categories',
      id,
    })
    .catch(() => null)

  if (!category) {
    return <NotFound category="Category" back="/categories" />
  }

  const childrens = await payload
    .find({
      collection: 'categories',
      where: {
        parent: {
          equals: id,
        },
      },
      limit: 0,
    })
    .catch(() => ({ docs: [] as Category[] }))

  const recipes = await payload
    .find({
      collection: 'recipes',
      where: {
        'categories.category': {
          equals: id,
        },
      },
      // not limit,
      limit: 100,
      depth: 2,
    })
    .catch(() => ({ docs: [] as Recipe[] }))

  return (
    <div>
      <ContentHeader
        label={`Category: ${category.name}`}
        breadcrumbs={[
          {
            label: 'Categories',
            href: '/categories',
          },
          {
            label: category.name,
          },
        ]}
      />
      {childrens?.docs.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom children="Sub Categories" />
          <GridCat docs={childrens.docs} />
        </Box>
      )}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }} children="Recipes" />
        {recipes?.docs.length > 0 ? (
          <GridList docs={recipes.docs} />
        ) : (
          <Typography variant="body1" children="No recipes found." color="textSecondary" />
        )}
      </Box>
    </div>
  )
}

export default PageCategory
