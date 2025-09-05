import { NextRequest, NextResponse } from 'next/server'
import { createUser, generateToken } from '@/lib/auth'
import type { SignupData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: SignupData = await request.json()
    
    // Validate required fields
    if (!data.email || !data.password || !data.display_name || !data.job_title || !data.company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (data.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Create user
    const user = await createUser(data)
    const token = generateToken(user.id)

    // Remove password hash from response
    const userResponse = {
      ...user,
      metadata: {
        ...user.metadata,
        password_hash: undefined
      }
    }

    return NextResponse.json({
      user: userResponse,
      token
    }, { status: 201 })

  } catch (error: any) {
    console.error('Signup error:', error)
    
    if (error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}