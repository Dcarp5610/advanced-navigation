# OOTD Everyday

An Instagram-inspired multi-screen mobile application built with Expo and React Native for the Advanced Multi-Screen Mobile Application with Collaborative Navigation assignment.

## Overview

OOTD Everyday is a mobile application based around outfit-of-the-day content. The interface is inspired by Instagram's navigation structure and visual design while using OOTD Everyday branding and outfit content.

The application demonstrates multi-screen navigation, reusable components, dynamic content, interactive elements, and light/dark theme support.

## Features

- Instagram-inspired mobile interface
- Five main navigation screens
- Tab navigation
- Stack navigation for post details
- Home feed with stories and outfit posts
- Reels-style video screen
- Instagram-inspired Messages screen
- Search and Explore screen
- Profile screen with outfit grid
- Interactive post likes and reposts
- Double-tap post liking
- Dynamic post navigation
- Search filtering
- Light and dark theme support
- Reusable React Native components
- TypeScript prop definitions

## Screens

### Home

Displays an Instagram-inspired home feed with:

- Stories row
- Outfit posts
- Like button
- Comment count
- Repost button
- Share count
- Save icon
- Double-tap to like a post
- Navigation to individual post details

### Reels

A Reels-style screen featuring:

- Full-screen outfit video
- Instagram-inspired overlay controls
- Outfit profile and caption overlay
- Reels navigation styling

### Messages

An Instagram-inspired direct messages screen featuring:

- Account header
- Search bar
- Notes section
- Map section
- Messages and Requests labels
- Static message list
- Profile pictures
- Online status indicators
- Unread message indicators

### Search

An Explore-style screen featuring:

- Search bar
- Search filtering by username, caption, or location
- Category filter buttons
- Three-column outfit grid
- Video indicators
- Video view counts
- Navigation to individual posts

### Profile

The OOTD Everyday profile screen featuring:

- Profile information
- Post, follower, and following counts
- Edit Profile button
- Share Profile button
- Profile content tabs
- Outfit photo grid
- Navigation to individual posts

## Navigation

The application uses both tab and stack navigation.

### Tab Navigation

The bottom navigation contains:

1. Home
2. Reels
3. Messages
4. Search
5. Profile

### Stack Navigation

Post details are handled using stack navigation.

Posts can be opened from:

- Home
- Search
- Profile

The Post Details screen uses a dynamic route based on the selected post ID.

Home
  └── Post Details

Search
  └── Post Details

Profile
  └── Post Details

## AI Usage

AI tools were used throughout the development of this project as a development support resource.

AI assistance was used for:

- Understanding and explaining Expo and React Native concepts
- Troubleshooting errors and debugging issues
- Assisting with Expo Router and navigation implementation
- Reviewing and improving React Native and TypeScript code
- Providing suggestions for UI layout and styling
- Helping organize reusable components
- Assisting with project documentation and README creation

AI was used as a development aid, while the project was built and integrated by me. I reviewed, modified, tested, and adapted the AI-assisted code and suggestions to meet the assignment requirements and the intended design.

## Project Structure

OOTDApp
├── assets
│   ├── Outfits
│   └── Reels
│
├── src
│   ├── app
│   │   ├── (tabs)
│   │   │   ├── index.tsx
│   │   │   ├── create.tsx
│   │   │   ├── activity.tsx
│   │   │   ├── search.tsx
│   │   │   ├── profile.tsx
│   │   │   └── _layout.tsx
│   │   │
│   │   ├── post
│   │   │   └── [id].tsx
│   │   │
│   │   └── _layout.tsx
│   │
│   ├── components
│   │   ├── PostCard.tsx
│   │   ├── StoryRow.tsx
│   │   ├── PostInteractionContext.tsx
│   │   └── app-tabs.tsx
│   │
│   ├── constants
│   │   └── theme.ts
│   │
│   └── data
│       └── post.ts
│
├── app.json
├── package.json
└── README.md
