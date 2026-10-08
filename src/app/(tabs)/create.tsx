import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const reelVideo = require('../../../assets/Reels/outfit-reel-1.mp4');

const friendAvatars = [
  'https://picsum.photos/id/64/100/100',
  'https://picsum.photos/id/65/100/100',
  'https://picsum.photos/id/91/100/100',
];

export default function ReelsScreen() {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);

  const [likes, setLikes] = useState(1248);
  const [comments, setComments] = useState(46);
  const [reposts, setReposts] = useState(18);
  const [shares, setShares] = useState(12);
  const [saves, setSaves] = useState(34);

  const player = useVideoPlayer(reelVideo, (videoPlayer) => {
    videoPlayer.loop = true;
  });

  useFocusEffect(
    useCallback(() => {
      player.replay();
      player.play();

      return () => {
        player.pause();
        player.currentTime = 0;
      };
    }, [player]),
  );

  const handleLike = () => {
    setLiked((current) => {
      setLikes((count) => (current ? count - 1 : count + 1));
      return !current;
    });
  };

  const handleRepost = () => {
    setReposted((current) => {
      setReposts((count) => (current ? count - 1 : count + 1));
      return !current;
    });
  };

  const handleSave = () => {
    setSaved((current) => {
      setSaves((count) => (current ? count - 1 : count + 1));
      return !current;
    });
  };

  const handleComment = () => {
    setComments((count) => count + 1);
  };

  const handleShare = () => {
    setShares((count) => count + 1);
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }

    return count.toString();
  };

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.overlay}>
        <SafeAreaView style={styles.topSection} edges={['top']}>
          <View style={styles.topBar}>
            <Pressable style={styles.topButton}>
              <Ionicons
                name="add"
                size={30}
                color="#ffffff"
              />
            </Pressable>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Reels
              </Text>

              <Pressable style={styles.friendsButton}>
                <Text style={styles.friendsText}>
                  Friends
                </Text>

                <View style={styles.friendAvatars}>
                  {friendAvatars.map((avatar, index) => (
                    <Image
                      key={avatar}
                      source={{ uri: avatar }}
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

            <Pressable style={styles.topButton}>
              <Ionicons
                name="options-outline"
                size={27}
                color="#ffffff"
              />
            </Pressable>
          </View>
        </SafeAreaView>

        <View style={styles.rightControls}>
          <Pressable
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={34}
              color={liked ? '#ff3040' : '#ffffff'}
            />

            <Text style={styles.actionText}>
              {formatCount(likes)}
            </Text>
          </Pressable>

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

          <Pressable
            style={styles.actionButton}
            onPress={handleSave}
          >
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={31}
              color="#ffffff"
            />

            <Text style={styles.actionText}>
              {formatCount(saves)}
            </Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={30}
              color="#ffffff"
            />
          </Pressable>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/1027/100/100',
              }}
              style={styles.profileImage}
            />

            <Text style={styles.username}>
              ootd.everyday
            </Text>

            <Pressable
              style={[
                styles.followButton,
                following && styles.followingButton,
              ]}
              onPress={() =>
                setFollowing((current) => !current)
              }
            >
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

          <Text style={styles.caption}>
            Today&apos;s outfit inspiration ✨
          </Text>

          <Text style={styles.description}>
            Simple, stylish, and ready for the day. What do
            you think of this look?
          </Text>

          <View style={styles.interestRow}>
            <Pressable style={styles.interestButton}>
              <Text style={styles.interestText}>
                Not interested
              </Text>
            </Pressable>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  topSection: {
    width: '100%',
  },

  topBar: {
    height: 70,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  topButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  friendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  friendsText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  friendAvatars: {
    flexDirection: 'row',
    marginLeft: 7,
  },

  friendAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },

  rightControls: {
    position: 'absolute',
    right: 12,
    bottom: 190,
    alignItems: 'center',
    gap: 18,
  },

  actionButton: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  bottomContent: {
    position: 'absolute',
    left: 16,
    right: 76,
    bottom: 24,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginRight: 9,
  },

  username: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },

  followButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },

  followingButton: {
    backgroundColor: '#ffffff',
  },

  followText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  followingText: {
    color: '#000000',
  },

  caption: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  description: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 12,
  },

  interestRow: {
    flexDirection: 'row',
    gap: 8,
  },

  interestButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  interestText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});