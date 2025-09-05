import { createBucketClient } from '@cosmicjs/sdk'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { User } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export interface SignupData {
  email: string;
  password: string;
  display_name: string;
  job_title: string;
  company: string;
  experience_level: string;
  location: string;
  bio?: string;
  linkedin_url?: string;
  topics_of_interest?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function createUser(data: SignupData): Promise<User> {
  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);
    
    // Generate slug from display name
    const slug = data.display_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Math.random().toString(36).substring(2, 8);

    // Map experience level to the format expected by Cosmic
    const experienceLevelMap: Record<string, string> = {
      'junior': 'Junior (0-2 years)',
      'mid': 'Mid-level (3-5 years)', 
      'senior': 'Senior (6-10 years)',
      'executive': 'Executive (10+ years)'
    };

    const response = await cosmic.objects.insertOne({
      type: 'users',
      title: data.display_name,
      slug: slug,
      metadata: {
        email: data.email.toLowerCase(),
        password_hash: hashedPassword,
        display_name: data.display_name,
        job_title: data.job_title,
        company: data.company,
        experience_level: {
          key: data.experience_level,
          value: experienceLevelMap[data.experience_level] || data.experience_level
        },
        location: data.location,
        bio: data.bio || '',
        linkedin_url: data.linkedin_url || '',
        topics_of_interest: data.topics_of_interest || [],
        available_for_matching: true,
        created_at: new Date().toISOString()
      }
    });
    
    return response.object as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function authenticateUser(data: LoginData): Promise<{ user: User; token: string } | null> {
  try {
    const user = await findUserByEmail(data.email);
    if (!user) {
      return null;
    }

    const isValidPassword = await verifyPassword(data.password, user.metadata.password_hash);
    if (!isValidPassword) {
      return null;
    }

    const token = generateToken(user.id);
    
    return { user, token };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email.toLowerCase()
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const users = response.objects as User[];
    // Convert undefined to null to match return type
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function findUserById(id: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        id
      })
      .depth(1);
    
    // Convert undefined to null to match return type
    return response.object as User || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error finding user by ID:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<SignupData>): Promise<User> {
  try {
    const updateData: any = {};
    
    if (updates.display_name) updateData.display_name = updates.display_name;
    if (updates.job_title) updateData.job_title = updates.job_title;
    if (updates.company) updateData.company = updates.company;
    if (updates.location) updateData.location = updates.location;
    if (updates.bio !== undefined) updateData.bio = updates.bio;
    if (updates.linkedin_url !== undefined) updateData.linkedin_url = updates.linkedin_url;
    if (updates.topics_of_interest) updateData.topics_of_interest = updates.topics_of_interest;
    
    if (updates.experience_level) {
      const experienceLevelMap: Record<string, string> = {
        'junior': 'Junior (0-2 years)',
        'mid': 'Mid-level (3-5 years)', 
        'senior': 'Senior (6-10 years)',
        'executive': 'Executive (10+ years)'
      };
      
      updateData.experience_level = {
        key: updates.experience_level,
        value: experienceLevelMap[updates.experience_level] || updates.experience_level
      };
    }

    const response = await cosmic.objects.updateOne(userId, {
      metadata: updateData
    });
    
    return response.object as User;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
}