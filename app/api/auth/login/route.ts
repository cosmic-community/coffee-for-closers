import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'
import type { LoginData } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const data: LoginData = await request.json()
    
    // Validate required fields
    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await authenticateUser(data)
    
    if (!result) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Remove password hash from response
    const userResponse = {
      ...result.user,
      metadata: {
        ...result.user.metadata,
        password_hash: undefined
      }
    }

    return NextResponse.json({
      user: userResponse,
      token: result.token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}