# Coffee for Closers - Sales Professional Network

![App Preview](https://imgix.cosmicjs.com/fa08f140-8a67-11f0-8af5-6d65ce6e8553-photo-1460925895917-afdab827c52f-1757083962229.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A professional networking platform for software sales professionals to connect through weekly virtual coffee chats. Get matched with peers based on experience level, sales topics, and interests.

## Features

- 🤝 **Smart Matching**: Automatic weekly pairing based on experience level and interests
- 👤 **Professional Profiles**: Detailed sales professional profiles with expertise areas
- ☕ **Coffee Chat Management**: Schedule and track virtual coffee meetings
- 🏷️ **Topic-Based Networking**: Connect around specific sales methodologies and tools
- 📊 **Progress Tracking**: Monitor networking activity and chat completion
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68baf7a2285c02bfe718db85&clone_repository=68baface285c02bfe718dbb9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> I want to build a social network for people working in software sales. The idea is that you can sign up, create a profile, and get matched on a weekly basis with someone else on the platform for a 20 minute virtual coffee chat.

### Code Generation Prompt

> Let's build the front end application for the coffee for closers website. This site should allow people working in softwares sales to sign up, fill out a profile, and get matched up weekly with other people on the platform to meet for a 20 minute virtual coffee chat.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Package Manager**: Bun
- **Development**: ESLint, TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with the Coffee for Closers content model

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching User Profiles
```typescript
const response = await cosmic.objects
  .find({ type: 'user-profiles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);

const profiles = response.objects;
```

### Creating a Coffee Chat
```typescript
const newChat = await cosmic.objects.insertOne({
  type: 'coffee-chats',
  title: `${participant1.title} & ${participant2.title} Coffee Chat`,
  metadata: {
    participant_1: participant1.id,
    participant_2: participant2.id,
    scheduled_date: '2024-01-15',
    scheduled_time: '2:00 PM EST',
    status: 'scheduled',
    week_number: 3
  }
});
```

## Cosmic CMS Integration

This application uses three main content types:

- **User Profiles**: Member profiles with sales background and networking preferences
- **Topics**: Sales-related topics for matching and networking
- **Coffee Chats**: Scheduled meetings between matched professionals

The content model supports automatic matching based on topics of interest, experience levels, and availability preferences.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Build command: `bun run build`
4. Publish directory: `.next`

Make sure to add your Cosmic environment variables to your hosting platform's dashboard.

<!-- README_END -->