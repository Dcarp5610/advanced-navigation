import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Post } from "@/data/post";

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export default function PostCard({ post, onPress }: PostCardProps) {
  return (
    <View style={styles.container}>
      {/* Post header */}
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <Text style={styles.profileText}>
            {post.username
              .split(".")
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      {/* Post image */}
      <Pressable onPress={onPress}>
        <Image source={post.image} style={styles.image} />
      </Pressable>

      {/* Action buttons */}
      <View style={styles.actions}>
        <Text style={styles.actionText}>Like</Text>
        <Text style={styles.actionText}>Comment</Text>
        <Text style={styles.actionText}>Share</Text>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes} likes</Text>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.caption}> {post.caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1689c7",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },

  username: {
    fontSize: 14,
    fontWeight: "600",
  },

  location: {
    fontSize: 12,
    color: "#777777",
    marginTop: 2,
  },

  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    backgroundColor: "#f5f5f5",
  },

  actions: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 24,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },

  likes: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 12,
  },

  captionContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 12,
  },

  caption: {
    fontSize: 14,
    flex: 1,
  },
});
