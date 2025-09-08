'use client'

import Link from 'next/link'
import type { UserProfile } from '@/types'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Chip,
  Box,
  Button,
  Stack,
} from '@mui/material'
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material'

interface ProfileCardProps {
  profile: UserProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Sales Methodology':
        return 'primary'
      case 'Industry Focus':
        return 'secondary'
      case 'Tools & Technology':
        return 'success'
      case 'Career Development':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar
            src={
              profile.metadata.profile_image?.imgix_url 
                ? `${profile.metadata.profile_image.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`
                : undefined
            }
            alt={profile.metadata.display_name}
            sx={{ width: 60, height: 60 }}
          >
            {profile.metadata.display_name.charAt(0).toUpperCase()}
          </Avatar>
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {profile.metadata.display_name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <BusinessIcon sx={{ fontSize: '0.875rem', color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {profile.metadata.job_title} at {profile.metadata.company}
              </Typography>
            </Box>

            <Chip
              label={profile.metadata.experience_level.value}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {profile.metadata.bio}
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
          {profile.metadata.topics_of_interest && 
           Array.isArray(profile.metadata.topics_of_interest) &&
           profile.metadata.topics_of_interest.slice(0, 2).map((topic: any, index: number) => (
            <Chip
              key={index}
              label={topic.metadata?.topic_name || topic.title}
              size="small"
              color={getBadgeColor(topic.metadata?.category?.value || '') as any}
              variant="filled"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationIcon sx={{ fontSize: '0.875rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {profile.metadata.location}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          href={`/profiles/${profile.slug}`}
          variant="contained"
          size="small"
          endIcon={<ArrowForwardIcon />}
          fullWidth
          sx={{ fontWeight: 500 }}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  )
}