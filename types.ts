// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// User Profile interface
export interface UserProfile extends CosmicObject {
  type: 'user-profiles';
  metadata: {
    display_name: string;
    job_title: string;
    company: string;
    experience_level: {
      key: string;
      value: string;
    };
    location: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    bio: string;
    linkedin_url?: string;
    topics_of_interest?: Topic[] | string[];
    available_for_matching: boolean;
  };
}

// Topic interface
export interface Topic extends CosmicObject {
  type: 'topics';
  metadata: {
    topic_name: string;
    description?: string;
    category: {
      key: string;
      value: string;
    };
  };
}

// Coffee Chat interface
export interface CoffeeChat extends CosmicObject {
  type: 'coffee-chats';
  metadata: {
    participant_1: UserProfile;
    participant_2: UserProfile;
    scheduled_date: string;
    scheduled_time: string;
    meeting_link?: string;
    status: {
      key: string;
      value: string;
    };
    week_number?: number;
    completion_confirmed?: boolean;
    feedback_rating?: number;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type literals for select-dropdown values
export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'executive';
export type TopicCategory = 'methodology' | 'industry' | 'tools' | 'career';
export type ChatStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

// Type guards
export function isUserProfile(obj: CosmicObject): obj is UserProfile {
  return obj.type === 'user-profiles';
}

export function isTopic(obj: CosmicObject): obj is Topic {
  return obj.type === 'topics';
}

export function isCoffeeChat(obj: CosmicObject): obj is CoffeeChat {
  return obj.type === 'coffee-chats';
}

// Utility types
export type CreateUserProfileData = Omit<UserProfile, 'id' | 'created_at' | 'modified_at'>;
export type CreateCoffeeChatData = Omit<CoffeeChat, 'id' | 'created_at' | 'modified_at'>;