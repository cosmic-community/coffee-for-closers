'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material'

interface ExperienceFilterProps {
  onFilterChange: (level: string) => void
}

export default function ExperienceFilter({ onFilterChange }: ExperienceFilterProps) {
  const [selectedLevel, setSelectedLevel] = useState('all')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSelectedLevel(value)
    onFilterChange(value)
  }

  const experienceLevels = [
    { value: 'all', label: 'All Levels', count: null },
    { value: 'junior', label: 'Junior (0-2 years)', count: 12 },
    { value: 'mid', label: 'Mid-level (3-5 years)', count: 18 },
    { value: 'senior', label: 'Senior (6-10 years)', count: 24 },
    { value: 'executive', label: 'Executive (10+ years)', count: 8 },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Filter by Experience
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
          <FormLabel 
            component="legend" 
            sx={{ 
              fontSize: '0.875rem', 
              fontWeight: 500,
              color: 'text.primary',
              mb: 1,
            }}
          >
            Experience Level
          </FormLabel>
          <RadioGroup
            value={selectedLevel}
            onChange={handleChange}
            name="experience-level"
          >
            {experienceLevels.map((level) => (
              <FormControlLabel
                key={level.value}
                value={level.value}
                control={
                  <Radio 
                    size="small"
                    sx={{
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {level.label}
                    </Typography>
                    {level.count && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                      >
                        ({level.count})
                      </Typography>
                    )}
                  </Box>
                }
                sx={{
                  m: 0,
                  py: 0.5,
                  '& .MuiFormControlLabel-label': {
                    width: '100%',
                    fontSize: '0.875rem',
                  },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}