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
    fetch(`/api/recipes?page=${page}&limit=${state.limit}&sort=title`)
      .then((res) => res.json())
      .then((data) => setState((prev) => new State({ ...prev, ...data, loading: false })))
      .catch((err) => {
        console.error('Error fetching recipes:', err)
      })
  }, [page, state.limit])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Recipes
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <SearchIcon />
        <Button
          variant="outlined"
          children={state.isList ? <ListIcon /> : <WindowIcon />}
          onClick={() => setState((s) => s.Set('isList', !s.isList))}
        />
        <Select
          size="small"
          value={state.limit}
          onChange={(e) => setState((s) => s.Set('limit', e.target.value))}
          sx={{ ml: 2 }}
        >
          {[20, 50, 100, 200].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <GridList list={state.isList} loading={state.loading} docs={state.docs} />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
        <Pagination
          count={state.totalPages}
          page={page}
          onChange={(_event, value) => setPage(value)}
        />
      </Box>
      <SnackFab>
        <Tooltip title="Create New Recipe" placement="left">
          <Fab
            children={<Add />}
            color="success"
            LinkComponent="a"
            href="/admin/collections/recipes/create"
          />
        </Tooltip>
      </SnackFab>
    </div>
  )
}
