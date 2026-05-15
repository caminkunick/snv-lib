'use client'

import { Core } from '@/components/core'
import { User } from '@/payload-types'
import { AppBar, Avatar, Box, Container, IconButton, ThemeProvider, Toolbar } from '@mui/material'

export const PreCon = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
  return (
    <ThemeProvider theme={Core.theme}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end">
            <Avatar children={user?.email.slice(0, 1).toLocaleUpperCase()} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}
