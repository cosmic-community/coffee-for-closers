import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, updateUserProfile } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const updates = await request.json()
    
    // Validate required fields
    if (!updates.display_name || !updates.job_title || !updates.company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedUser = await updateUserProfile(decoded.userId, updates)

    // Remove password hash from response
    const userResponse = {
      ...updatedUser,
      metadata: {
        ...updatedUser.metadata,
        password_hash: undefined
      }
    }

    return NextResponse.json({ user: userResponse })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}