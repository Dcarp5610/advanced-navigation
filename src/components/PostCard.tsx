import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { Post } from '@/data/post';

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export default function PostCard({ post, onPress }: PostCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: post.profileImage }}
          style={styles.profilePicture}
        />

        <View style={styles.headerInfo}>
          <Text style={[styles.username, { color: theme.text }]}>
            {post.username}
          </Text>

          <Text style={[styles.location, { color: theme.secondaryText }]}>
            {post.location}
          </Text>
        </View>
      </View>

      <Pressable onPress={onPress}>
        <Image source={post.image} style={styles.image} />
      </Pressable>

      <View style={styles.actions}>
        <View style={styles.actionItem}>
          <Text style={[styles.action, { color: theme.text }]}>♡</Text>
          <Text style={[styles.number, { color: theme.text }]}>
            {post.likes}
          </Text>
        </View>

        <View style={styles.actionItem}>
          <Text style={[styles.action, { color: theme.text }]}>○</Text>
          <Text style={[styles.number, { color: theme.text }]}>
            {post.comments}
          </Text>
        </View>

        <View style={styles.actionItem}>
          <Text style={[styles.action, { color: theme.text }]}>➤</Text>
          <Text style={[styles.number, { color: theme.text }]}>
            {post.shares}
          </Text>
        </View>

        <View style={styles.spacer} />

        <Text style={[styles.action, { color: theme.text }]}>□</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.captionContainer}>
          <Text style={[styles.username, { color: theme.text }]}>
            {post.username}
          </Text>

          <Text style={[styles.caption, { color: theme.text }]}>
            {' '}
            {post.caption}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerInfo: {
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
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actions: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  action: {
    fontSize: 27,
    fontWeight: '300',
  },
  number: {
    fontSize: 13,
  },
  spacer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  captionContainer: {
    flexDirection: 'row',
  },
  caption: {
    fontSize: 14,
    flex: 1,
  },
});