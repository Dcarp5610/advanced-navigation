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
- Home feed with stories and posts
- Reels-style video screen
- Messages screen
- Search and Explore screen
- Profile screen with outfit grid
- Interactive likes and reposts
- Dynamic post navigation
- Light and dark theme support
- Reusable React Native components
- TypeScript prop definitions

## Screens

### Home

Displays an Instagram-inspired home feed with:

- Stories
- Outfit posts
- Like, comment, repost, share, and save actions
- Post detail navigation

### Reels

A Reels-style screen featuring:

- Full-screen outfit video

### Messages

An Instagram-inspired direct messages screen featuring:

- Search messages
- Notes section
- Messages and Requests
- Online indicators
- Unread indicators
- Message navigation

### Search

An Explore-style screen featuring:

- Search functionality
- Category filters
- Three-column content grid
- Video indicators
- View counts
- Post detail navigation

### Profile

The OOTD Everyday profile includes:

- Profile information
- Post, follower, and following counts
- Edit Profile and Share Profile buttons
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


Home / Search / Profile → Post Details


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
