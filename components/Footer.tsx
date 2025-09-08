'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  IconButton,
  Divider,
} from '@mui/material'
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Coffee as CoffeeIcon,
} from '@mui/icons-material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CoffeeIcon sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Coffee for Closers
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Connecting sales professionals through meaningful conversations and shared experiences. 
              Build your network, share knowledge, and accelerate your career.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Platform
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'Browse Profiles', href: '/profiles' },
                { label: 'Coffee Chats', href: '/chats' },
                { label: 'Join Community', href: '/signup' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  variant="body2"
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'Help Center', href: '/help' },
                { label: 'Community Guidelines', href: '/guidelines' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  variant="body2"
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Get weekly insights, tips, and updates from the sales community.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Newsletter signup could go here */}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 Coffee for Closers. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
            ].map((link) => (
              <Typography
                key={link.label}
                variant="body2"
                component={Link}
                href={link.href}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'white',
                    textDecoration: 'underline',
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}