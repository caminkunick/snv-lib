'use client'

import { Add } from '@mui/icons-material'
import { Fab, Snackbar, Stack, Tooltip } from '@mui/material'
import { ReactNode } from 'react'

export const SnackFab = (props: { children?: ReactNode }) => {
  return (
    <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Stack spacing={2}>{props.children}</Stack>
    </Snackbar>
  )
}
