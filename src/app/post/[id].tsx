import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePostInteractions } from '@/components/PostInteractionContext';
import { Colors } from '@/constants/theme';
import {
  explorePosts,
  homePosts,
  profilePosts,
} from '@/data/post';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const {
    getInteraction,
    toggleLike,
    toggleRepost,
  } = usePostInteractions();

  const lastTap = useRef(0);

  const allPosts = [
    ...homePosts,
    ...explorePosts,
    ...profilePosts,
  ];

  const post = allPosts.find(
    (item) => item.id.toString() === id,
  );

  if (!post) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        <View style={styles.errorContainer}>
          <Text
            style={[
              styles.errorText,
              { color: theme.text },
            ]}
          >
            Post not found.
          </Text>

          <Pressable onPress={() => router.back()}>
            <Text
              style={[
                styles.backText,
                { color: theme.text },
              ]}
            >
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const interaction = getInteraction(post.id);

  const likeCount = interaction.liked
    ? post.likes + 1
    : post.likes;

  const repostCount = interaction.reposted
    ? post.shares + 1
    : post.shares;

  const handleImagePress = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap.current;

    if (timeSinceLastTap < 300) {
      toggleLike(post.id);
      lastTap.current = 0;
      return;
    }

    lastTap.current = now;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      edges={['top']}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={theme.text}
          />
        </Pressable>

        <Text
          style={[
            styles.headerTitle,
            { color: theme.text },
          ]}
        >
          Post
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.background }}
      >
        <View style={styles.userSection}>
          <Image
            source={{ uri: post.profileImage }}
            style={styles.profilePicture}
          />

          <View style={styles.userInfo}>
            <Text
              style={[
                styles.username,
                { color: theme.text },
              ]}
            >
              {post.username}
            </Text>

            <Text
              style={[
                styles.location,
                { color: theme.secondaryText },
              ]}
            >
              {post.location}
            </Text>
          </View>

          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={theme.text}
          />
        </View>

        <Pressable onPress={handleImagePress}>
          <Image
            source={post.image}
            style={styles.postImage}
          />
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            style={styles.actionItem}
            onPress={() => toggleLike(post.id)}
          >
            <Ionicons
              name={
                interaction.liked
                  ? 'heart'
                  : 'heart-outline'
              }
              size={30}
              color={
                interaction.liked
                  ? '#ed4956'
                  : theme.text
              }
            />

            <Text
              style={[
                styles.number,
                { color: theme.text },
              ]}
            >
              {likeCount}
            </Text>
          </Pressable>

          <View style={styles.actionItem}>
            <Ionicons
              name="chatbubble-outline"
              size={27}
              color={theme.text}
            />

            <Text
              style={[
                styles.number,
                { color: theme.text },
              ]}
            >
              {post.comments}
            </Text>
          </View>

          <Pressable
            style={styles.actionItem}
            onPress={() => toggleRepost(post.id)}
          >
            <Ionicons
              name="repeat-outline"
              size={29}
              color={
                interaction.reposted
                  ? '#0095f6'
                  : theme.text
              }
            />

            <Text
              style={[
                styles.number,
                { color: theme.text },
              ]}
            >
              {repostCount}
            </Text>
          </Pressable>

          <View style={styles.actionItem}>
            <Ionicons
              name="paper-plane-outline"
              size={27}
              color={theme.text}
            />

            <Text
              style={[
                styles.number,
                { color: theme.text },
              ]}
            >
              {post.shares}
            </Text>
          </View>

          <View style={styles.spacer} />

          <Pressable onPress={() => {}}>
            <Ionicons
              name="bookmark-outline"
              size={28}
              color={theme.text}
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.captionContainer}>
            <Text
              style={[
                styles.username,
                { color: theme.text },
              ]}
            >
              {post.username}
            </Text>

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },

  backButton: {
    width: 45,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  headerSpacer: {
    width: 45,
  },

  userSection: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  userInfo: {
    flex: 1,
    marginLeft: 10,
  },

  username: {
    fontSize: 14,
    fontWeight: '600',
  },

  location: {
    fontSize: 12,
    marginTop: 2,
  },

  postImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },

  actions: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 16,
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  number: {
    fontSize: 13,
  },

  spacer: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  captionContainer: {
    flexDirection: 'row',
  },

  caption: {
    fontSize: 14,
    flex: 1,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },

  errorText: {
    fontSize: 18,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
});