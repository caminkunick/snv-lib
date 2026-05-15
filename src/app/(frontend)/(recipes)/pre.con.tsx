'use client'

import { Core } from '@/components/core'
import { User } from '@/payload-types'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LocalBar } from '@mui/icons-material'

export const PreCon = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        // ล้างค่าใน Client-side (ถ้ามี) และ Redirect
        router.push('/')
        router.refresh() // เพื่อล้าง Cache ของ Server Component
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <ThemeProvider theme={Core.theme}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              color="primary"
              variant="h6"
              sx={{
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
              }}
            >
              <LocalBar />
              Synova
              <Typography variant="inherit" color="textPrimary">
                Library
              </Typography>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="inherit" onClick={(e) => setAnchor(e.currentTarget)}>
            <Avatar children={user?.email.slice(0, 1).toLocaleUpperCase()} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {children}
      </Container>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </ThemeProvider>
  )
}
