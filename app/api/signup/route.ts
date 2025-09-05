import { NextResponse } from 'next/server'
import { createUserProfile } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['display_name', 'job_title', 'company', 'experience_level', 'location', 'bio']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: true, message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate bio length
    if (data.bio.length < 50) {
      return NextResponse.json(
        { error: true, message: 'Bio must be at least 50 characters long' },
        { status: 400 }
      )
    }

    // Create the user profile
    const profile = await createUserProfile(data)

    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        slug: profile.slug,
        title: profile.title
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: true, message: 'Failed to create profile. Please try again.' },
      { status: 500 }
    )
  }
}