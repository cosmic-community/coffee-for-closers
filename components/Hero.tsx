'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from '@mui/material'
import {
  Coffee as CoffeeIcon,
  PersonAdd as PersonAddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'

export default function Hero() {
  const { user } = useAuth()
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Connect. Learn. Close.
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              Weekly coffee chats with sales professionals to share knowledge, 
              build relationships, and accelerate your career
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 6 }}
          >
            {user ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/dashboard"
                  startIcon={<CoffeeIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.9),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/profiles"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.1),
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Browse Profiles
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/signup"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.9),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Join the Community
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/profiles"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.1),
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Browse Profiles
                </Button>
              </>
            )}
          </Stack>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap',
              opacity: 0.8,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                500+
              </Typography>
              <Typography variant="body2">
                Sales Professionals
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                1,200+
              </Typography>
              <Typography variant="body2">
                Coffee Chats
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                50+
              </Typography>
              <Typography variant="body2">
                Companies
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}