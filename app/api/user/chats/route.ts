import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { getCoffeeChats } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
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

    // Get all coffee chats
    const allChats = await getCoffeeChats()
    
    // Filter chats that include the current user
    const userChats = allChats.filter(chat => 
      chat.metadata.participant_1?.id === decoded.userId ||
      chat.metadata.participant_2?.id === decoded.userId
    )

    return NextResponse.json({ chats: userChats })

  } catch (error) {
    console.error('Error fetching user chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    )
  }
}