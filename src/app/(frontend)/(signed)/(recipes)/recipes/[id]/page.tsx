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
import configPromise from '@payload-config'

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
    <Box sx={{ pb: 8 }}>
      <Button
        variant="text"
        LinkComponent="a"
        href={resolvedParams?.ref ? `/recipes/${resolvedParams.ref}` : `/recipes`}
        children="Back"
        size="small"
        startIcon={<ChevronLeftIcon />}
        sx={{ mb: 2, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      />

      <Box
        sx={{
          mb: 4,
          pb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h3"
          children={recipe?.title}
          sx={{
            textTransform: 'capitalize',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        />
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1.5 }}>
          <Chip
            label="Recipes"
            component="a"
            href="/recipes"
            size="small"
            clickable
            variant="outlined"
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
            children={recipe?.title}
          />
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: 'flex-start' }}>
        {recipe?.image && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: { md: 'sticky' },
                top: { md: 88 },
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 4,
              }}
            >
              <Avatar
                variant="square"
                src={recipe.image.firebaseURL}
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Grid>
        )}
        <Grid size={{ xs: 12, md: recipe?.image ? 8 : 12 }}>
          <Box
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <Table rows={tableRows} snvSum={snvPrice} total={totalPrice} />
          </Box>
        </Grid>
      </Grid>

      {content && (
        <Box
          sx={{
            mt: 5,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: 'action.hover',
            '& h1, & h2, & h3': { fontWeight: 700 },
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Method
          </Typography>
          <Box sx={{ mt: 1 }}>
            <RichText data={content} />
          </Box>
        </Box>
      )}

      {(recipe?.categories.length || 0) > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            gutterBottom
            sx={{ fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
            {recipe?.categories.map((c) => (
              <Chip
                size="small"
                key={c.id}
                label={c.category?.name}
                color="primary"
                variant="outlined"
                clickable
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
    </Box>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'recipes',
    pagination: false,
    select: {},
  })
  return res.docs.map((doc) => ({ id: String(doc.id) }))
}

export default PageRecipe
