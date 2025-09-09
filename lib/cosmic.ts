import { createBucketClient } from '@cosmicjs/sdk'
import type { UserProfile, Topic, CoffeeChat, CosmicResponse, CreateUserProfileData } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// User Profile functions
export async function getUserProfiles(): Promise<UserProfile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as UserProfile[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch user profiles');
  }
}

export async function getUserProfile(slug: string): Promise<UserProfile | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'user-profiles',
        slug
      })
      .depth(1);
    
    return response.object as UserProfile;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user profile');
  }
}

export async function getAvailableUsers(): Promise<UserProfile[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'user-profiles',
        'metadata.available_for_matching': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as UserProfile[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch available users');
  }
}

export async function createUserProfile(data: any): Promise<UserProfile> {
  try {
    // Generate slug from display name
    const slug = data.display_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Map experience level to the format expected by Cosmic
    const experienceLevelMap: Record<string, string> = {
      'junior': 'Junior (0-2 years)',
      'mid': 'Mid-level (3-5 years)', 
      'senior': 'Senior (6-10 years)',
      'executive': 'Executive (10+ years)'
    }

    const response = await cosmic.objects.insertOne({
      type: 'user-profiles',
      title: data.display_name,
      slug: slug,
      metadata: {
        display_name: data.display_name,
        job_title: data.job_title,
        company: data.company,
        experience_level: {
          key: data.experience_level,
          value: experienceLevelMap[data.experience_level] || data.experience_level
        },
        location: data.location,
        bio: data.bio,
        linkedin_url: data.linkedin_url || '',
        zoom_link: data.zoom_link || '',
        topics_of_interest: data.topics_of_interest || [],
        available_for_matching: data.available_for_matching !== false
      }
    });
    
    return response.object as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }
}

// Topic functions
export async function getTopics(): Promise<Topic[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'topics' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Topic[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch topics');
  }
}

export async function getTopicsByCategory(category: string): Promise<Topic[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'topics',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Topic[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch topics by category');
  }
}

// Coffee Chat functions
export async function getCoffeeChats(): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'coffee-chats' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as CoffeeChat[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch coffee chats');
  }
}

export async function getCoffeeChat(id: string): Promise<CoffeeChat | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'coffee-chats',
        id
      })
      .depth(1);
    
    return response.object as CoffeeChat;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch coffee chat');
  }
}

export async function getUpcomingChats(): Promise<CoffeeChat[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'coffee-chats',
        'metadata.status': 'scheduled'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const chats = response.objects as CoffeeChat[];
    
    // Sort by scheduled date (newest first)
    return chats.sort((a, b) => {
      const dateA = new Date(a.metadata.scheduled_date).getTime();
      const dateB = new Date(b.metadata.scheduled_date).getTime();
      return dateA - dateB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch upcoming chats');
  }
}

// Create functions
export async function createCoffeeChat(
  participant1: UserProfile,
  participant2: UserProfile,
  scheduledDate: string,
  scheduledTime: string,
  meetingLink?: string
): Promise<CoffeeChat> {
  try {
    // Use participant's personal Zoom link if available, otherwise use provided meeting link
    const finalMeetingLink = meetingLink || 
      participant1.metadata.zoom_link || 
      participant2.metadata.zoom_link || 
      undefined;

    const response = await cosmic.objects.insertOne({
      type: 'coffee-chats',
      title: `${participant1.metadata.display_name} & ${participant2.metadata.display_name} Coffee Chat`,
      metadata: {
        participant_1: participant1.id,
        participant_2: participant2.id,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        meeting_link: finalMeetingLink,
        status: 'scheduled',
        completion_confirmed: false
      }
    });
    
    return response.object as CoffeeChat;
  } catch (error) {
    throw new Error('Failed to create coffee chat');
  }
}

export async function updateChatStatus(chatId: string, status: string): Promise<CoffeeChat> {
  try {
    const response = await cosmic.objects.updateOne(chatId, {
      metadata: {
        status: status
      }
    });
    
    return response.object as CoffeeChat;
  } catch (error) {
    throw new Error('Failed to update chat status');
  }
}