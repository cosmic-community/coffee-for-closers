'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material'
import {
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material'
import ProfileCard from './ProfileCard'
import type { UserProfile } from '@/types'

interface FeaturedProfilesProps {
  profiles: UserProfile[]
}

export default function FeaturedProfiles({ profiles }: FeaturedProfilesProps) {
  // Show first 3 profiles as featured
  const featuredProfiles = profiles.slice(0, 3)

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Professionals
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Connect with experienced sales professionals from top companies
          </Typography>
        </Box>

        {featuredProfiles.length > 0 ? (
          <>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {featuredProfiles.map((profile) => (
                <Grid item xs={12} sm={6} lg={4} key={profile.id}>
                  <ProfileCard profile={profile} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/profiles"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                View All Profiles
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No profiles available at the moment
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}