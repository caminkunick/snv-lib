'use client'

import { Recipe } from '@/libs/recipes'
import { Edit } from '@mui/icons-material'
import { Box, Grid, IconButton, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const CardRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
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
      <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'uppercase', mb: 4 }}>
        Recipes
      </Typography>
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
              <Box className="content">
                <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.1 }}>
                  {doc.title}
                </Typography>
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
                <div>
                  {doc.clients.map((client) => (
                    <Typography key={client.id} variant="body2">
                      {client.title}
                    </Typography>
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
