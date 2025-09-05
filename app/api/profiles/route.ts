import { NextResponse } from 'next/server'
import { getUserProfiles } from '@/lib/cosmic'

export async function GET() {
  try {
    const profiles = await getUserProfiles()
    return NextResponse.json(profiles)
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    )
  }
}