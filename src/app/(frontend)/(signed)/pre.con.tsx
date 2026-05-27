'use client'

import { Core } from '@/components/core'
import { User } from '@/payload-types'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LocalBar, Menu as MenuIcon } from '@mui/icons-material'

class State {
  drawerOpen: boolean = false

  constructor(data?: Partial<State>) {
    Object.assign(this, data)
  }

  Set<K extends keyof State>(key: K, value: State[K]): State {
    return new State({ ...this, [key]: value })
  }
}

export const PreCon = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
  const [state, setState] = useState(new State())
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
          <IconButton
            edge="start"
            children={<MenuIcon />}
            onClick={() => setState((s) => s.Set('drawerOpen', true))}
          />
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
              <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8 }}>
                <Typography variant="inherit">Synova</Typography>
                <Typography variant="caption" color="textSecondary" children="Library" />
              </Box>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="inherit" onClick={(e) => setAnchor(e.currentTarget)}>
            <Avatar children={user?.email.slice(0, 1).toLocaleUpperCase()} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {children}
      </Container>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Drawer
        open={state.drawerOpen}
        onClose={() => setState(state.Set('drawerOpen', false))}
        slotProps={{
          paper: {
            sx: {
              minWidth: 240,
            },
          },
        }}
      >
        <List disablePadding subheader={<ListSubheader>Menu</ListSubheader>}>
          <ListItemButton component={Link} href="/recipes">
            <ListItemText primary="Recipes" />
          </ListItemButton>
          <ListItemButton component={Link} href="/categories">
            <ListItemText primary="Categories" />
          </ListItemButton>
        </List>
      </Drawer>
    </ThemeProvider>
  )
}
