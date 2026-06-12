'use client'

import { ListItemButton, ListItemIcon, ListItemText, Menu, MenuProps } from '@mui/material'
import { useRouter } from 'next/navigation'
import { User } from '@/payload-types'
import { AdminPanelSettings, Logout } from '@mui/icons-material'

export type UserMenuProps = Pick<MenuProps, 'anchorEl' | 'onClose'> & { user: User | null }
export const UserMenu = ({ anchorEl, onClose, user }: UserMenuProps) => {
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
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{
        list: {
          disablePadding: true,
        },
        paper: {
          sx: {
            minWidth: 200,
          },
        },
      }}
    >
      <ListItemButton onClick={() => router.push('/admin')}>
        <ListItemIcon>
          <AdminPanelSettings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Menu>
  )
}
