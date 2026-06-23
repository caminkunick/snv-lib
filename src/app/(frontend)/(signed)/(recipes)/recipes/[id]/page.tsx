'use server'

import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Recipe } from '@/libs/recipes'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Table, TableRowData } from './table'
import { Product } from '@/libs/products'
import { Avatar, Box, Breadcrumbs, Button, Chip, Fab, Grid, Typography } from '@mui/material'
import { Edit as EditIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { SnackFab } from '@/components/snack.fab'

const PageRecipe = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: {
    [key: string]: string | string[]
  }
}) => {
  const { id } = await params
  const resolvedParams = await searchParams

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

  // Pre-compute all table data on server to avoid hydration mismatches
  const tableRows: TableRowData[] = [
    ...(recipe?.ingredients.map((i) => {
      const quantity = Number(i.quantity || 0)
      const cost = i.product?.Get().cost() || 0
      const totalCost = i.product?.Get().totalCost(quantity) || 0
      return {
        id: i.id,
        name: `${i.product?.name}`.toLocaleLowerCase(),
        qty: `${i.quantity} ${i.unit}`,
        image: i.product?.image,
        cost,
        totalCost,
      } as TableRowData
    }) || []),
    ...(recipe?.otherIngredients.map((i) => {
      const quantity = Number(i.quantity || 0)
      const cost = i.subIngredient.cost
      const totalCost = cost * quantity
      return {
        id: i.id,
        name: i.subIngredient.title,
        qty: `${i.quantity} ${i.unit}`,
        image: i.subIngredient.image?.thumbnailURL,
        cost,
        totalCost,
      } as TableRowData
    }) || []),
    ...(recipe?.subRecipes.map((i) => ({
      id: i.id,
      name: i.recipe.title,
      qty: `${i.quantity} ${i.unit}`,
      image: i.recipe.image?.thumbnailURL,
      link: `/recipes/${i.recipe.id}?ref=${recipe?.id}`,
    })) || []),
  ]

  // Pre-compute costs on server
  const snvPrice = Number(
    (
      recipe?.ingredients.reduce(
        (total, item) => total + (item.product?.Get().totalCost(Number(item.quantity) || 0) || 0),
        0,
      ) || 0
    ).toFixed(2),
  )

  const othersPrice = Number(
    (
      recipe?.otherIngredients.reduce((total, i) => {
        const quantity = Number(i.quantity || 0)
        return total + i.subIngredient.cost * quantity
      }, 0) || 0
    ).toFixed(2),
  )

  const totalPrice = Number((snvPrice + othersPrice).toFixed(2))

  return (
    <div>
      <Button
        variant="outlined"
        LinkComponent="a"
        href={resolvedParams?.ref ? `/recipes/${resolvedParams.ref}` : `/recipes`}
        children="Back"
        size="small"
        startIcon={<ChevronLeftIcon />}
        sx={{ mb: 1 }}
      />
      <Typography
        variant="h4"
        children={recipe?.title}
        sx={{
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}
      />
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Chip label="Recipes" component="a" href="/recipes" size="small" />
        <Typography variant="caption" color="text.primary" children={recipe?.title} />
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
        {recipe?.image && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ width: '100%', aspectRatio: '1 / 1' }}>
              <Avatar
                variant="square"
                src={recipe.image.firebaseURL}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 4,
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid size={{ xs: 12, md: recipe?.image ? 8 : 12 }}>
          <Table rows={tableRows} snvSum={snvPrice} total={totalPrice} />
        </Grid>
      </Grid>
      {content && <RichText data={content} />}
      <Box sx={{ mt: 2 }} />
      {(recipe?.categories.length || 0) > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {recipe?.categories.map((c) => (
              <Chip
                size="small"
                key={c.id}
                label={c.category?.name}
                color="primary"
                component="a"
                href={`/categories/${c.category?.id}`}
                target="_blank"
              />
            ))}
          </Box>
        </Box>
      )}
      <SnackFab>
        <Fab
          children={<EditIcon />}
          color="primary"
          LinkComponent="a"
          href={`/admin/collections/recipes/${id}`}
          target="_blank"
        />
      </SnackFab>
    </div>
  )
}

export default PageRecipe
