'use client'

import { Recipe } from '@/libs/recipes'
import { Add, List as ListIcon, Window as WindowIcon } from '@mui/icons-material'
import { Box, Button, Fab, MenuItem, Pagination, Select, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { GridList } from './grid.list'
import { SnackFab } from '@/components/snack.fab'
import { SearchIcon } from './search.panel'

class State {
  loading: boolean = false
  docs: Recipe[] = []
  hasNextPage: boolean = false
  hasPrevPage: boolean = false
  limit: number = 20
  nextPage: number | null = null
  page: number = 1
  pagingCounter: number = 1
  prevPage: number | null = null
  totalDocs: number = 0
  totalPages: number = 0
  isList: boolean = false
  searchQuery: string = ''

  constructor(data?: Partial<State>) {
    Object.assign(this, data)
    this.docs = (data?.docs || []).map((doc) => new Recipe(doc))
  }

  Set<T extends keyof State>(key: T, value: State[T]): State {
    return new State({ ...this, [key]: value })
  }
}

export const RecipesClient = () => {
  const [page, setPage] = useState(1)
  const [state, setState] = useState(new State())

  const fetchRecipes = useCallback(() => {
    setState((prev) => prev.Set('loading', true))
    const searchParam = state.searchQuery ? `&search=${encodeURIComponent(state.searchQuery)}` : ''
    fetch(`/api/recipes?page=${page}&limit=${state.limit}&sort=title${searchParam}`)
      .then((res) => res.json())
      .then((data) => setState((prev) => new State({ ...prev, ...data, loading: false })))
      .catch((err) => {
        console.error('Error fetching recipes:', err)
      })
  }, [page, state.limit, state.searchQuery])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F7F4EF',
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            mb: 6,
            pb: 4,
            borderBottom: '1px solid #E7E1D7',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'primary.light',
              px: 2,
              py: 0.5,
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'text.primary',
              mb: 2,
            }}
          >
            Collection
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#1F2421',
              letterSpacing: '-0.02em',
              mb: 2,
              '& .accent': {
                fontStyle: 'italic',
                color: 'primary.main',
              },
            }}
          >
            Our <span className="accent">Culinary</span> Recipes
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              color: '#5C635D',
              fontWeight: 300,
              maxWidth: '600px',
            }}
          >
            A carefully curated collection of recipes to inspire your next meal
          </Typography>
        </Box>

        {/* Controls Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            mb: 4,
            bgcolor: '#FFFFFF',
            p: 2.5,
            borderRadius: '16px',
            border: '1px solid #E7E1D7',
            boxShadow: '0 1px 3px rgba(31, 36, 33, 0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#5C635D',
                fontWeight: 500,
              }}
            >
              {state.totalDocs} recipes
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <SearchIcon
            onSearch={(query) => {
              setState((s) => s.Set('searchQuery', query))
              setPage(1)
            }}
          />

          <Button
            variant="outlined"
            children={state.isList ? <ListIcon /> : <WindowIcon />}
            onClick={() => setState((s) => s.Set('isList', !s.isList))}
            sx={{
              minWidth: '44px',
              height: '44px',
              borderRadius: '12px',
              borderColor: '#E7E1D7',
              color: '#1F2421',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.light',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          />

          <Select
            size="small"
            value={state.limit}
            onChange={(e) => setState((s) => s.Set('limit', e.target.value))}
            sx={{
              minWidth: '80px',
              borderRadius: '12px',
              bgcolor: '#FBF9F5',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E7E1D7',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          >
            {[20, 50, 100, 200].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Content */}
        <GridList
          list={state.isList}
          loading={state.loading}
          docs={state.docs}
          searchQuery={state.searchQuery}
        />

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 6,
            mb: 4,
          }}
        >
          <Pagination
            count={state.totalPages}
            page={page}
            onChange={(_event, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#1F2421',
                borderColor: '#E7E1D7',
                fontWeight: 400,
                '&:hover': {
                  bgcolor: 'primary.light',
                  borderColor: 'primary.main',
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: '#FFFFFF',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* FAB */}
      <SnackFab>
        <Tooltip title="Create New Recipe" placement="left">
          <Fab
            children={<Add />}
            LinkComponent="a"
            href="/admin/collections/recipes/create"
            sx={{
              bgcolor: 'primary.main',
              color: '#FFFFFF',
              width: '64px',
              height: '64px',
              boxShadow: '0 4px 12px rgba(227, 166, 34, 0.3)',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(227, 166, 34, 0.4)',
              },
              transition: 'all 0.2s ease',
            }}
          />
        </Tooltip>
      </SnackFab>
    </Box>
  )
}
