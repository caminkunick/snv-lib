'use client'

import React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import { LocalBar, MenuBook, Lock, Science, AutoAwesome } from '@mui/icons-material'
import { Core } from '@/components/core'
import Image from 'next/image'
import bg from './bg.png'

type Props = {
  user: { email: string } | null
  adminUrl: string
}

const Hero = styled(Box)(({}) => ({
  width: '100%',
  aspectRatio: '16 / 9',
  position: 'relative',
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
    filter: 'brightness(0.4)',
  },
  '.hero-content': {
    position: 'relative',
    zIndex: 2,
  },
}))

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F7F4EF', color: '#1F2421' }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(247,244,239,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E7E1D7',
          color: '#1F2421',
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
            <Typography variant="body2" sx={{ color: '#5C635D', mr: 2 }}>
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
              '&:hover': { bgcolor: 'primary.main', color: '#FFFFFF' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {user ? 'Go to Library' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Hero>
        <Image src={bg} alt="Background" />
        <Box
          className="hero-content"
          sx={{
            py: { xs: 10, md: 16 },
            textAlign: 'center',
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255,255,255,0.9)',
              color: 'primary.main',
              px: 2,
              py: 0.75,
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 3,
              backdropFilter: 'blur(8px)',
            }}
          >
            <LocalBar sx={{ fontSize: 18 }} />
            Beverage Recipe Collection
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: { xs: '2.75rem', md: '4.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              mb: 2,
              '& .accent': {
                fontStyle: 'italic',
                color: 'primary.main',
              },
            }}
          >
            Synova <span className="accent">Library</span>
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: 'auto',
              mb: 4,
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: 'rgba(255,255,255,0.85)',
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
              sx={{
                fontWeight: 700,
                px: 4,
                borderRadius: '12px',
                textTransform: 'none',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(227, 166, 34, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(227, 166, 34, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {user ? 'เข้าสู่คลังสูตร' : 'เข้าสู่ระบบ'}
            </Button>
            <Button
              href="https://synova.biz"
              target="_blank"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#FFFFFF',
                '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.1)' },
                fontWeight: 600,
                px: 4,
                borderRadius: '12px',
                textTransform: 'none',
              }}
            >
              เว็บไซต์ Synova
            </Button>
          </Stack>
        </Box>
      </Hero>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'primary.light',
              color: 'primary.main',
              px: 2,
              py: 0.5,
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 2,
            }}
          >
            Features
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: '#1F2421',
              letterSpacing: '-0.02em',
              mb: 1,
              '& .accent': { fontStyle: 'italic', color: 'primary.main' },
            }}
          >
            ทำไมต้อง <span className="accent">Synova Library</span>?
          </Typography>
          <Typography sx={{ color: '#5C635D', fontWeight: 300, fontSize: '1.125rem' }}>
            ระบบจัดการสูตรที่ออกแบบมาเพื่อทีม Synova โดยเฉพาะ
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  border: '1px solid #E7E1D7',
                  bgcolor: '#FFFFFF',
                  height: '100%',
                  boxShadow: '0 1px 3px rgba(31, 36, 33, 0.04)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(31, 36, 33, 0.08)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2421', mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#5C635D', lineHeight: 1.8, fontWeight: 300 }}
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
          borderRadius: '24px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E7E1D7',
          boxShadow: '0 1px 3px rgba(31, 36, 33, 0.04)',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          <Lock sx={{ fontSize: 32, color: 'primary.main' }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            color: '#1F2421',
            mb: 1,
          }}
        >
          เนื้อหาสงวนสำหรับสมาชิก
        </Typography>
        <Typography sx={{ color: '#5C635D', mb: 3, maxWidth: 480, mx: 'auto', fontWeight: 300 }}>
          สูตรทั้งหมดในระบบเข้าถึงได้เฉพาะผู้ใช้งานที่ได้รับสิทธิ์จากทีม Synova เท่านั้น
          หากต้องการสิทธิ์การเข้าถึง กรุณาติดต่อผู้ดูแลระบบ
        </Typography>
        <Button
          href={adminUrl}
          target="_blank"
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 700,
            px: 4,
            borderRadius: '12px',
            textTransform: 'none',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(227, 166, 34, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(227, 166, 34, 0.4)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {user ? 'เข้าสู่คลังสูตร' : 'เข้าสู่ระบบ'}
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid #E7E1D7',
          py: 3,
          textAlign: 'center',
          color: '#5C635D',
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
