import { ImageSourcePropType } from 'react-native';

export interface Post {
  id: number;
  username: string;
  image: ImageSourcePropType;
  caption: string;
  likes: number;
  location: string;
}

export const homePosts: Post[] = [
  {
    id: 101,
    username: 'alex.m',
    image: { uri: 'https://picsum.photos/600/750?random=101' },
    caption: 'Just another day.',
    likes: 124,
    location: 'Calgary, AB',
  },
  {
    id: 102,
    username: 'sarah.lee',
    image: { uri: 'https://picsum.photos/600/750?random=102' },
    caption: 'A little moment from today.',
    likes: 87,
    location: 'Vancouver, BC',
  },
  {
    id: 103,
    username: 'mike.travels',
    image: { uri: 'https://picsum.photos/600/750?random=103' },
    caption: 'Making some memories.',
    likes: 203,
    location: 'Banff, AB',
  },
  {
    id: 104,
    username: 'jess.eats',
    image: { uri: 'https://picsum.photos/600/750?random=104' },
    caption: 'Mood',
    likes: 98,
    location: 'Toronto, ON',
  },
  {
    id: 105,
    username: 'daniel.daily',
    image: { uri: 'https://picsum.photos/600/750?random=105' },
    caption: 'Enjoying the little things.',
    likes: 156,
    location: 'Edmonton, AB',
  },
  {
    id: 106,
    username: 'emily.jpg',
    image: { uri: 'https://picsum.photos/600/750?random=106' },
    caption: 'Life is a wave.',
    likes: 176,
    location: 'Calgary, AB',
  },
];