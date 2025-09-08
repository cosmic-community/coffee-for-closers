'use client'

import { Grid, Box, Typography } from '@mui/material'
import ProfileCard from './ProfileCard'
import type { UserProfile } from '@/types'

interface ProfileGridProps {
  profiles: UserProfile[]
}

export default function ProfileGrid({ profiles }: ProfileGridProps) {
  if (profiles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No profiles found matching your criteria
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your filters or check back later
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {profiles.map((profile) => (
        <Grid item xs={12} sm={6} lg={4} key={profile.id}>
          <ProfileCard profile={profile} />
        </Grid>
      ))}
    </Grid>
  )
}