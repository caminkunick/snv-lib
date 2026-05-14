'use client'

import React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { LocalBar, MenuBook, Lock, Science, AutoAwesome } from '@mui/icons-material'
import { Core } from '@/components/core'

type Props = {
  user: { email: string } | null
  adminUrl: string
}

const features = [
  {
    icon: <MenuBook sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'สูตรครบครัน',
    desc: 'รวบรวมสูตร Beverage ทุกประเภทจาก Synova ไว้ในที่เดียว ทั้ง Master Recipe และ Sub Recipe',
  },
  {
    icon: <Science sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'ส่วนผสมชัดเจน',
    desc: 'ระบุส่วนผสม สัดส่วน และวิธีการทำอย่างละเอียด พร้อมเชื่อมโยงกับสินค้า Synova โดยตรง',
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'อัปเดตอยู่เสมอ',
    desc: 'ทีมงาน Synova ดูแลและเพิ่มสูตรใหม่อย่างต่อเนื่อง เพื่อให้คุณได้ใช้งานสูตรที่ทันสมัยที่สุด',
  },
  {
    icon: <Lock sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'เข้าถึงเฉพาะสมาชิก',
    desc: 'ข้อมูลสูตรทั้งหมดสงวนไว้สำหรับผู้ใช้งานที่ได้รับสิทธิ์เท่านั้น เพื่อคุ้มครองทรัพย์สินทางปัญญา',
  },
]

const HomePageClient = Core.connect()(({ user, adminUrl }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f0f0f', color: '#fff' }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(15,15,15,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <LocalBar sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: 1, fontWeight: 700 }}>
            SYNOVA{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              LIBRARY
            </Box>
          </Typography>
          {user ? (
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mr: 2 }}>
              {user.email}
            </Typography>
          ) : null}
          <Button
            href={adminUrl}
            target="_blank"
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {user ? 'Go to Library' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          textAlign: 'center',
          background:
            'linear-gradient(180deg, rgba(var(--mui-palette-primary-mainChannel) / 0.08) 0%, transparent 100%)',
          px: 2,
        }}
      >
        <LocalBar sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
        <Typography
          variant="h1"
          sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.15, mb: 2 }}
        >
          Synova{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Library
          </Box>
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 560,
            mx: 'auto',
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          คลังสูตร Beverage สำหรับทีม Synova — รวบรวมสูตรทุกรายการไว้ในที่เดียว
          เข้าถึงได้เฉพาะผู้ใช้งานที่ได้รับสิทธิ์
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            href={adminUrl}
            target="_blank"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 700, px: 4, borderRadius: 2, textTransform: 'none' }}
          >
            {user ? 'เข้าสู่คลังสูตร' : 'เข้าสู่ระบบ'}
          </Button>
          <Button
            href="https://synovafoods.com"
            target="_blank"
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)' },
              fontWeight: 600,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            เว็บไซต์ Synova
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mx: { xs: 2, md: 8 } }} />

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
          ทำไมต้อง Synova Library?
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', mb: 8 }}
        >
          ระบบจัดการสูตรที่ออกแบบมาเพื่อทีม Synova โดยเฉพาะ
        </Typography>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  height: '100%',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}
                >
                  {f.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Banner */}
      <Box
        sx={{
          mx: { xs: 2, md: 8 },
          mb: { xs: 8, md: 12 },
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.primary.main}08 100%)`,
          border: (theme) => `1px solid ${theme.palette.primary.main}44`,
          textAlign: 'center',
        }}
      >
        <Lock sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          เนื้อหาสงวนสำหรับสมาชิก
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.55)', mb: 3, maxWidth: 480, mx: 'auto' }}
        >
          สูตรทั้งหมดในระบบเข้าถึงได้เฉพาะผู้ใช้งานที่ได้รับสิทธิ์จากทีม Synova เท่านั้น
          หากต้องการสิทธิ์การเข้าถึง กรุณาติดต่อผู้ดูแลระบบ
        </Typography>
        <Button
          href={adminUrl}
          target="_blank"
          variant="contained"
          color="primary"
          sx={{ fontWeight: 700, px: 4, borderRadius: 2, textTransform: 'none' }}
        >
          {user ? 'เข้าสู่คลังสูตร' : 'เข้าสู่ระบบ'}
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          py: 3,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        <Typography variant="caption" suppressHydrationWarning>
          © {new Date().getFullYear()} Synova Library — Beverage Recipe Collection
        </Typography>
      </Box>
    </Box>
  )
})

export default HomePageClient
