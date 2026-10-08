// Provides the icons used for the post actions.
import { Ionicons } from '@expo/vector-icons';

// useRef is used to detect double taps on the post image.
import { useRef } from 'react';

// React Native components used to build the reusable PostCard.
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// Provides the application's light and dark theme colours.
import { Colors } from '@/constants/theme';

// Imports the TypeScript Post interface used to describe post data.
import { Post } from '@/data/post';

// Provides shared like and repost state across the application.
import { usePostInteractions } from './PostInteractionContext';

// Defines the props that the PostCard component expects.
interface PostCardProps {
  // The post information that should be displayed.
  post: Post;

  // Function used to open the Post Details screen.
  onDetailsPress: () => void;
}

// Reusable component for displaying an individual post.
export default function PostCard({
  post,
  onDetailsPress,
}: PostCardProps) {

  // Gets the current device colour scheme.
  const colorScheme = useColorScheme();

  // Selects the appropriate light or dark theme.
  const theme =
    Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Gets the shared interaction functions and state.
  const {
    getInteraction,
    toggleLike,
    toggleRepost,
  } = usePostInteractions();

  // Gets the current like/repost state for this specific post.
  const interaction = getInteraction(post.id);

  // Stores the time of the previous image tap.
  // This allows us to detect a double tap.
  const lastTap = useRef(0);

  // Adds one like to the original count when the post is liked.
  const likeCount = interaction.liked
    ? post.likes + 1
    : post.likes;

  // Adds one repost to the original share count when the post is reposted.
  const repostCount = interaction.reposted
    ? post.shares + 1
    : post.shares;

  // Handles taps on the post image.
  const handleImagePress = () => {

    // Gets the current time in milliseconds.
    const now = Date.now();

    // Calculates how much time has passed since the previous tap.
    const timeSinceLastTap =
      now - lastTap.current;

    // If the second tap happens within 300 milliseconds,
    // the image is treated as a double tap.
    if (timeSinceLastTap < 300) {

      // Double tapping the image likes the post.
      toggleLike(post.id);

      // Resets the previous tap time.
      lastTap.current = 0;

      return;
    }

    // Stores the current tap time for comparison with the next tap.
    lastTap.current = now;
  };

  return (
    // Main container for one post.
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >

      {/* Post header containing the profile picture, username, location, and menu. */}
      <View style={styles.header}>

        {/* Displays the user's profile picture. */}
        <Image
          source={{ uri: post.profileImage }}
          style={styles.profilePicture}
        />

        {/* Contains the username and location. */}
        <View style={styles.headerInfo}>

          {/* Displays the username. */}
          <Text
            style={[
              styles.username,
              { color: theme.text },
            ]}
          >
            {post.username}
          </Text>

          {/* Displays the post location. */}
          <Text
            style={[
              styles.location,
              { color: theme.secondaryText },
            ]}
          >
            {post.location}
          </Text>
        </View>

        {/* Opens the Post Details screen when pressed. */}
        <Pressable onPress={onDetailsPress}>
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={theme.text}
          />
        </Pressable>
      </View>

      {/* Post image. A double tap likes the post. */}
      <Pressable onPress={handleImagePress}>
        <Image
          source={post.image}
          style={styles.image}
        />
      </Pressable>

      {/* Row containing all post interaction buttons. */}
      <View style={styles.actions}>

        {/* Like button. */}
        <Pressable
          style={styles.actionItem}
          onPress={() => toggleLike(post.id)}
        >
          <Ionicons
            // Changes between an outline and filled heart.
            name={
              interaction.liked
                ? 'heart'
                : 'heart-outline'
            }
            size={27}

            // Changes the heart colour when the post is liked.
            color={
              interaction.liked
                ? '#ed4956'
                : theme.text
            }
          />

          {/* Displays the current like count. */}
          <Text
            style={[
              styles.number,
              { color: theme.text },
            ]}
          >
            {likeCount}
          </Text>
        </Pressable>

        {/* Comment display. */}
        <View style={styles.actionItem}>
          <Ionicons
            name="chatbubble-outline"
            size={25}
            color={theme.text}
          />

          {/* Displays the number of comments. */}
          <Text
            style={[
              styles.number,
              { color: theme.text },
            ]}
          >
            {post.comments}
          </Text>
        </View>

        {/* Repost button. */}
        <Pressable
          style={styles.actionItem}
          onPress={() => toggleRepost(post.id)}
        >
          <Ionicons
            name="repeat-outline"
            size={27}

            // Changes the icon colour when the post is reposted.
            color={
              interaction.reposted
                ? '#0095f6'
                : theme.text
            }
          />

          {/* Displays the current repost count. */}
          <Text
            style={[
              styles.number,
              { color: theme.text },
            ]}
          >
            {repostCount}
          </Text>
        </Pressable>

        {/* Share display. */}
        <View style={styles.actionItem}>
          <Ionicons
            name="paper-plane-outline"
            size={26}
            color={theme.text}
          />

          {/* Displays the number of shares. */}
          <Text
            style={[
              styles.number,
              { color: theme.text },
            ]}
          >
            {post.shares}
          </Text>
        </View>

        {/* Pushes the bookmark icon to the far right. */}
        <View style={styles.spacer} />

        {/* Bookmark icon. */}
        <Ionicons
          name="bookmark-outline"
          size={27}
          color={theme.text}
        />
      </View>

      {/* Caption section below the interaction buttons. */}
      <View style={styles.content}>

        {/* Places the username and caption on the same line. */}
        <View style={styles.captionContainer}>

          {/* Displays the username before the caption. */}
          <Text
            style={[
              styles.username,
              { color: theme.text },
            ]}
          >
            {post.username}
          </Text>

          {/* Displays the post caption. */}
          <Text
            style={[
              styles.caption,
              { color: theme.text },
            ]}
          >
            {' '}
            {post.caption}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Styles used by the reusable PostCard component.
const styles = StyleSheet.create({

  // Main post container.
  container: {
    marginBottom: 12,
    borderBottomWidth: 1,
  },

  // Header containing the profile information.
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  // Circular profile picture.
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Allows the username/location section to use the remaining space.
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  // Username styling.
  username: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Location text styling.
  location: {
    fontSize: 12,
    marginTop: 2,
  },

  // Main post image.
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },

  // Horizontal row containing the post actions.
  actions: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 16,
  },

  // Layout shared by each action and its number.
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  // Styling for interaction counts.
  number: {
    fontSize: 13,
  },

  // Takes up the remaining horizontal space,
  // pushing the bookmark icon to the right.
  spacer: {
    flex: 1,
  },

  // Caption area below the actions.
  content: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },

  // Places the username and caption beside each other.
  captionContainer: {
    flexDirection: 'row',
  },

  // Styling for the caption text.
  caption: {
    fontSize: 14,
    flex: 1,
  },
});