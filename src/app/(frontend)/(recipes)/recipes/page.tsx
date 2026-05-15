'use client'

import { Recipe } from '@/libs/recipes'
import { Add, Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, IconButton, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const CardRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  '&:hover': {
    '.image': {
      transform: 'scale(1.05)',
    },
  },
  '& .content': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
    pointerEvents: 'none',
    a: {
      pointerEvents: 'auto',
    },
  },
  '& .image': {
    transition: 'transform 0.3s ease',
  },
  '& .actions': {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
  },
  '& .clients': {
    display: 'flex',
    '> *': {
      transition: 'margin-right 0.3s ease',
      marginRight: theme.spacing(-1.5),
    },
    '&:hover': {
      '> *': {
        marginRight: theme.spacing(0.5),
      },
    },
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.3s ease',
  },
}))

const PageRecipes = () => {
  const [docs, setDocs] = useState<Recipe[]>([])

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setDocs(data.docs.map((doc: any) => new Recipe(doc)))
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err)
      })
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Recipes
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          LinkComponent={'a'}
          href="/admin/collections/recipes/create"
          size="small"
          children="Create New"
        />
      </Box>
      <Grid container spacing={1}>
        {docs.map((doc) => (
          <Grid key={doc.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CardRoot>
              {doc.image?.url && (
                <Box
                  className="image"
                  component="img"
                  src={doc.image.url}
                  alt={doc.title}
                  sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              )}
              <a className="overlay" href={`/recipes/${doc.id}`} target="_blank" />
              <Box className="content">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', lineHeight: 1.1, mb: 1 }}
                  children={doc.title}
                />
                <div className="actions">
                  <IconButton
                    size="small"
                    color="warning"
                    LinkComponent={'a'}
                    href={`/admin/collections/recipes/${doc.id}`}
                    target="_blank"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </div>
                <div className="clients">
                  {doc.clients.map((client) => (
                    <Avatar
                      key={client.id}
                      src={client.client?.image?.thumbnailURL}
                      sx={{ width: 24, height: 24 }}
                    />
                  ))}
                </div>
              </Box>
            </CardRoot>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default PageRecipes
