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
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState, createContext, Dispatch, SetStateAction, useContext } from 'react'

import Link from 'next/link'
import { LocalBar, Menu as MenuIcon } from '@mui/icons-material'
import { Popup, PopupValue } from '../comps/popup/popup'
import { UserMenu } from '@/components/user.menu'

class State {
  drawerOpen: boolean = false
  popup: PopupValue | null = null

  constructor(data?: Partial<State>) {
    Object.assign(this, data)
    this.popup = this.popup ? new PopupValue(this.popup) : null
  }

  Set<K extends keyof State>(key: K, value: State[K]): State {
    return new State({ ...this, [key]: value })
  }
}

const Context = createContext<{
  state: State
  setState: Dispatch<SetStateAction<State>>
}>({
  state: new State(),
  setState: () => {},
})

export const PreCon = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
  const [state, setState] = useState(new State())
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <Context.Provider value={{ state, setState }}>
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
        <UserMenu anchorEl={anchor} onClose={() => setAnchor(null)} user={user} />
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
        <Popup />
      </ThemeProvider>
    </Context.Provider>
  )
}

export const usePreCon = () => useContext(Context)
