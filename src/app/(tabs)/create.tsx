// Provides the icons used throughout the Reels screen.
import { Ionicons } from '@expo/vector-icons';

// useFocusEffect lets us detect when the Reels tab becomes active
// so the video can restart when the user returns to this screen.
import { useFocusEffect } from 'expo-router';

// Provides the video player and video display components from Expo.
import { useVideoPlayer, VideoView } from 'expo-video';

// React hooks used for managing state and running code when the screen gains focus.
import { useCallback, useState } from 'react';

// React Native components used to build the Reels interface.
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Keeps the top content inside the device's safe area.
import { SafeAreaView } from 'react-native-safe-area-context';

// Loads the local Reels video from the project's assets folder.
const reelVideo = require('../../../assets/Reels/outfit-reel-1.mp4');

// Profile pictures displayed beside the Friends button.
const friendAvatars = [
  'https://picsum.photos/id/64/100/100',
  'https://picsum.photos/id/65/100/100',
  'https://picsum.photos/id/91/100/100',
];

// Main component for the Reels tab.
export default function ReelsScreen() {

  // Tracks whether the Reel has been liked.
  const [liked, setLiked] = useState(false);

  // Tracks whether the Reel has been reposted.
  const [reposted, setReposted] = useState(false);

  // Tracks whether the Reel has been saved.
  const [saved, setSaved] = useState(false);

  // Tracks whether the user is following the account.
  const [following, setFollowing] = useState(false);

  // Starting interaction counts displayed beside the Reel buttons.
  const [likes, setLikes] = useState(1248);
  const [comments, setComments] = useState(46);
  const [reposts, setReposts] = useState(18);
  const [shares, setShares] = useState(12);
  const [saves, setSaves] = useState(34);

  // Creates the video player for the local Reel.
  const player = useVideoPlayer(reelVideo, (videoPlayer) => {

    // Makes the video automatically repeat after reaching the end.
    videoPlayer.loop = true;
  });

  // Runs whenever the Reels screen becomes active or inactive.
  useFocusEffect(
    useCallback(() => {

      // Restarts the video from the beginning.
      player.replay();

      // Immediately starts playing the video.
      player.play();

      // Runs when the user leaves the Reels screen.
      return () => {

        // Pauses the video when leaving the screen.
        player.pause();

        // Resets the video back to the beginning.
        player.currentTime = 0;
      };
    }, [player]),
  );

  // Handles the Like button.
  const handleLike = () => {
    setLiked((current) => {

      // Increases the count when liking and decreases it when unliking.
      setLikes((count) => (current ? count - 1 : count + 1));

      // Switches the liked state.
      return !current;
    });
  };

  // Handles the Repost button.
  const handleRepost = () => {
    setReposted((current) => {

      // Updates the repost count depending on the current state.
      setReposts((count) => (current ? count - 1 : count + 1));

      // Switches the reposted state.
      return !current;
    });
  };

  // Handles the Save button.
  const handleSave = () => {
    setSaved((current) => {

      // Updates the save count depending on the current state.
      setSaves((count) => (current ? count - 1 : count + 1));

      // Switches the saved state.
      return !current;
    });
  };

  // Adds one comment to the displayed comment count.
  const handleComment = () => {
    setComments((count) => count + 1);
  };

  // Adds one share to the displayed share count.
  const handleShare = () => {
    setShares((count) => count + 1);
  };

  // Converts large numbers into shorter Instagram-style values.
  // For example, 1,248 becomes 1.2K.
  const formatCount = (count: number) => {

    // Converts numbers over one million to M format.
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }

    // Converts numbers over one thousand to K format.
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }

    // Keeps smaller numbers as normal numbers.
    return count.toString();
  };

  return (
    // Main container for the full-screen Reels experience.
    <View style={styles.container}>

      {/* Displays the local Reel video in the background. */}
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Transparent layer placed over the video for the Reels controls. */}
      <View style={styles.overlay}>

        {/* Top section containing the Reels title and controls. */}
        <SafeAreaView style={styles.topSection} edges={['top']}>

          <View style={styles.topBar}>

            {/* Add button on the top-left. */}
            <Pressable style={styles.topButton}>
              <Ionicons
                name="add"
                size={30}
                color="#ffffff"
              />
            </Pressable>

            {/* Center section containing Reels and Friends. */}
            <View style={styles.titleContainer}>

              {/* Reels title. */}
              <Text style={styles.title}>
                Reels
              </Text>

              {/* Friends section with profile pictures. */}
              <Pressable style={styles.friendsButton}>

                <Text style={styles.friendsText}>
                  Friends
                </Text>

                {/* Displays the friend profile pictures. */}
                <View style={styles.friendAvatars}>
                  {friendAvatars.map((avatar, index) => (
                    <Image
                      // Uses the avatar URL as the unique key.
                      key={avatar}

                      source={{ uri: avatar }}

                      // Overlaps the profile pictures to match the Instagram-style design.
                      style={[
                        styles.friendAvatar,
                        {
                          marginLeft:
                            index === 0 ? 0 : -8,
                        },
                      ]}
                    />
                  ))}
                </View>
              </Pressable>
            </View>

            {/* Options button on the top-right. */}
            <Pressable style={styles.topButton}>
              <Ionicons
                name="options-outline"
                size={27}
                color="#ffffff"
              />
            </Pressable>
          </View>
        </SafeAreaView>

        {/* Vertical group of interaction buttons on the right side. */}
        <View style={styles.rightControls}>

          {/* Like button. */}
          <Pressable
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Ionicons
              // Changes between outline and filled heart depending on the liked state.
              name={liked ? 'heart' : 'heart-outline'}
              size={34}
              color={liked ? '#ff3040' : '#ffffff'}
            />

            <Text style={styles.actionText}>
              {formatCount(likes)}
            </Text>
          </Pressable>

          {/* Comment button. */}
          <Pressable
            style={styles.actionButton}
            onPress={handleComment}
          >
            <Ionicons
              name="chatbubble-outline"
              size={32}
              color="#ffffff"
            />

            <Text style={styles.actionText}>
              {formatCount(comments)}
            </Text>
          </Pressable>

          {/* Repost button. */}
          <Pressable
            style={styles.actionButton}
            onPress={handleRepost}
          >
            <Ionicons
              name="repeat-outline"
              size={34}
              color={reposted ? '#4cd964' : '#ffffff'}
            />

            <Text style={styles.actionText}>
              {formatCount(reposts)}
            </Text>
          </Pressable>

          {/* Share button. */}
          <Pressable
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Ionicons
              name="paper-plane-outline"
              size={31}
              color="#ffffff"
            />

            <Text style={styles.actionText}>
              {formatCount(shares)}
            </Text>
          </Pressable>

          {/* Save/bookmark button. */}
          <Pressable
            style={styles.actionButton}
            onPress={handleSave}
          >
            <Ionicons
              // Changes between outline and filled bookmark depending on the saved state.
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={31}
              color="#ffffff"
            />

            <Text style={styles.actionText}>
              {formatCount(saves)}
            </Text>
          </Pressable>

          {/* More options button. */}
          <Pressable style={styles.actionButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={30}
              color="#ffffff"
            />
          </Pressable>
        </View>

        {/* Bottom section containing the account information and caption. */}
        <View style={styles.bottomContent}>

          {/* Profile information row. */}
          <View style={styles.profileRow}>

            {/* Account profile picture. */}
            <Image
              source={{
                uri: 'https://picsum.photos/id/1027/100/100',
              }}
              style={styles.profileImage}
            />

            {/* Account username. */}
            <Text style={styles.username}>
              ootd.everyday
            </Text>

            {/* Follow button. */}
            <Pressable
              style={[
                styles.followButton,
                following && styles.followingButton,
              ]}
              onPress={() =>
                setFollowing((current) => !current)
              }
            >
              {/* Changes the button text depending on the follow state. */}
              <Text
                style={[
                  styles.followText,
                  following && styles.followingText,
                ]}
              >
                {following ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
          </View>

          {/* Reel caption. */}
          <Text style={styles.caption}>
            Today&apos;s outfit inspiration ✨
          </Text>

          {/* Reel description. */}
          <Text style={styles.description}>
            Simple, stylish, and ready for the day. What do
            you think of this look?
          </Text>

          {/* Interest buttons at the bottom. */}
          <View style={styles.interestRow}>

            {/* Not interested button. */}
            <Pressable style={styles.interestButton}>
              <Text style={styles.interestText}>
                Not interested
              </Text>
            </Pressable>

            {/* Interested button. */}
            <Pressable style={styles.interestButton}>
              <Text style={styles.interestText}>
                Interested
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

// Styles used to create the full-screen Instagram-style Reels layout.
const styles = StyleSheet.create({

  // Main full-screen container.
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Makes the video fill the entire screen.
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  // Places all Reels controls over the video.
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  // Top area containing the Reels navigation.
  topSection: {
    width: '100%',
  },

  // Arranges the top buttons and title horizontally.
  topBar: {
    height: 70,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Standard size and alignment for the top buttons.
  topButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Holds the Reels title and Friends section.
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  // Reels title styling.
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  // Arranges the Friends text and avatars together.
  friendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Friends label styling.
  friendsText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Places the friend profile pictures beside each other.
  friendAvatars: {
    flexDirection: 'row',
    marginLeft: 7,
  },

  // Circular styling for each friend profile picture.
  friendAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },

  // Positions the interaction buttons vertically on the right.
  rightControls: {
    position: 'absolute',
    right: 12,
    bottom: 190,
    alignItems: 'center',
    gap: 18,
  },

  // Controls the size and alignment of each interaction button.
  actionButton: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text displayed below interaction icons.
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  // Positions the account information near the bottom of the video.
  bottomContent: {
    position: 'absolute',
    left: 16,
    right: 76,
    bottom: 24,
  },

  // Arranges the profile picture, username, and Follow button.
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  // Profile picture displayed beside the username.
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginRight: 9,
  },

  // Username styling.
  username: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },

  // Default Follow button styling.
  followButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },

  // Changes the Follow button background after following.
  followingButton: {
    backgroundColor: '#ffffff',
  },

  // Default Follow button text.
  followText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Changes the text to black when the button is in the Following state.
  followingText: {
    color: '#000000',
  },

  // Main Reel caption styling.
  caption: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  // Description shown below the caption.
  description: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 12,
  },

  // Arranges the two interest buttons horizontally.
  interestRow: {
    flexDirection: 'row',
    gap: 8,
  },

  // Styling shared by the interest buttons.
  interestButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  // Text inside the interest buttons.
  interestText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});