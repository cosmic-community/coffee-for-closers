import { NextRequest, NextResponse } from 'next/server'
import { updateUserProfile, findUserById, verifyToken } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get current user
    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get profile data from request
    const data = await request.json()
    
    // Validate required fields
    if (!data.display_name || !data.job_title || !data.company || !data.experience_level || !data.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Update user profile
    const updatedUser = await updateUserProfile(user.id, {
      display_name: data.display_name,
      job_title: data.job_title,
      company: data.company,
      experience_level: data.experience_level,
      location: data.location,
      bio: data.bio || '',
      linkedin_url: data.linkedin_url || '',
      topics_of_interest: data.topics_of_interest || []
    })

    // Also update availability if provided
    if (typeof data.available_for_matching === 'boolean') {
      const cosmic = require('@/lib/auth').cosmic
      await cosmic.objects.updateOne(user.id, {
        metadata: {
          available_for_matching: data.available_for_matching
        }
      })
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    })

  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}