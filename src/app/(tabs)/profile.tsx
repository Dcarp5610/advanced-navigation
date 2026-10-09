import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { profilePosts } from '@/data/post';

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / 3;
const imageHeight = imageWidth * 1.33;

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      edges={['top']}
    >
      <FlatList
        data={profilePosts}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            {/* Top bar */}
            <View style={styles.topBar}>
              <Pressable style={styles.topButton}>
                <Ionicons
                  name="add"
                  size={30}
                  color={theme.text}
                />
              </Pressable>

              <View style={styles.usernameContainer}>
                <Text
                  style={[
                    styles.username,
                    { color: theme.text },
                  ]}
                >
                  ootd.everyday
                </Text>

                <Ionicons
                  name="chevron-down"
                  size={15}
                  color={theme.text}
                />

                <View style={styles.notificationDot} />
              </View>

              <View style={styles.topRight}>
                <Ionicons
                  name="at-outline"
                  size={27}
                  color={theme.text}
                />

                <Ionicons
                  name="menu"
                  size={31}
                  color={theme.text}
                />
              </View>
            </View>

            {/* Profile information */}
            <View style={styles.profileInfo}>
              <View style={styles.profilePictureContainer}>
                <Image
                  source={profilePosts[0].image}
                  style={styles.profilePicture}
                />

                <View
                  style={[
                    styles.profileAddButton,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.text,
                    },
                  ]}
                >
                  <Ionicons
                    name="add"
                    size={19}
                    color={theme.text}
                  />
                </View>
              </View>

              <View style={styles.profileDetails}>
                <Text
                  style={[
                    styles.displayName,
                    { color: theme.text },
                  ]}
                >
                  OOTD Everyday
                </Text>

                <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Text
                      style={[
                        styles.statNumber,
                        { color: theme.text },
                      ]}
                    >
                      12
                    </Text>

                    <Text
                      style={[
                        styles.statLabel,
                        { color: theme.text },
                      ]}
                    >
                      posts
                    </Text>
                  </View>

                  <View style={styles.stat}>
                    <Text
                      style={[
                        styles.statNumber,
                        { color: theme.text },
                      ]}
                    >
                      220
                    </Text>

                    <Text
                      style={[
                        styles.statLabel,
                        { color: theme.text },
                      ]}
                    >
                      followers
                    </Text>
                  </View>

                  <View style={styles.stat}>
                    <Text
                      style={[
                        styles.statNumber,
                        { color: theme.text },
                      ]}
                    >
                      452
                    </Text>

                    <Text
                      style={[
                        styles.statLabel,
                        { color: theme.text },
                      ]}
                    >
                      following
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Profile buttons */}
            <View style={styles.profileButtons}>
              <Pressable
                style={[
                  styles.profileButton,
                  {
                    backgroundColor:
                      theme.backgroundElement,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.profileButtonText,
                    { color: theme.text },
                  ]}
                >
                  Edit profile
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.profileButton,
                  {
                    backgroundColor:
                      theme.backgroundElement,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.profileButtonText,
                    { color: theme.text },
                  ]}
                >
                  Share profile
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.addPersonButton,
                  {
                    backgroundColor:
                      theme.backgroundElement,
                  },
                ]}
              >
                <Ionicons
                  name="person-add-outline"
                  size={20}
                  color={theme.text}
                />
              </Pressable>
            </View>

            {/* Profile tabs */}
            <View style={styles.contentTabs}>
              <View
                style={[
                  styles.contentTab,
                  styles.activeTab,
                  { borderBottomColor: theme.text },
                ]}
              >
                <MaterialCommunityIcons
                  name="view-grid-outline"
                  size={24}
                  color={theme.text}
                />
              </View>

              <View style={styles.contentTab}>
                <MaterialCommunityIcons
                  name="play-box-outline"
                  size={27}
                  color={theme.secondaryText}
                />
              </View>

              <View style={styles.contentTab}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={27}
                  color={theme.secondaryText}
                />
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.post}
            onPress={() =>
              router.push({
                pathname: '/post/[id]',
                params: {
                  id: item.id.toString(),
                },
              })
            }
          >
            <Image
              source={item.image}
              style={styles.postImage}
              resizeMode="cover"
            />

            <View style={styles.multipleIcon}>
              <Ionicons
                name="copy-outline"
                size={18}
                color="#ffffff"
              />
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },

  header: {
    width: '100%',
  },

  topBar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  topButton: {
    width: 38,
    alignItems: 'flex-start',
  },

  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  username: {
    fontSize: 18,
    fontWeight: '700',
  },

  notificationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#ed4956',
    marginLeft: 3,
  },

  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 2,
    paddingBottom: 20,
  },

  profilePictureContainer: {
    position: 'relative',
  },

  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  profileAddButton: {
    position: 'absolute',
    right: -3,
    bottom: -1,
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileDetails: {
    flex: 1,
    marginLeft: 22,
  },

  displayName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stat: {
    alignItems: 'center',
    minWidth: 54,
  },

  statNumber: {
    fontSize: 16,
    fontWeight: '600',
  },

  statLabel: {
    fontSize: 14,
    marginTop: 1,
  },

  profileButtons: {
    flexDirection: 'row',
    paddingHorizontal: 21,
    gap: 7,
    marginTop: 5,
    marginBottom: 3,
  },

  profileButton: {
    height: 35,
    flex: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  addPersonButton: {
    width: 48,
    height: 35,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentTabs: {
    height: 47,
    flexDirection: 'row',
  },

  contentTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    borderBottomWidth: 2,
  },

  row: {
    width: '100%',
  },

  post: {
    width: imageWidth,
    height: imageHeight,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#000000',
  },

  postImage: {
    width: '100%',
    height: '100%',
  },

  multipleIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});