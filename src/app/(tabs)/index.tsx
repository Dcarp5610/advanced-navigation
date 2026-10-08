// Provides navigation so we can open the Post Details screen.
import { router } from 'expo-router';

// React Native components used to build the Home screen.
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// Keeps the Home screen content inside the device's safe area.
import { SafeAreaView } from 'react-native-safe-area-context';

// Reusable component used to display each individual post.
import PostCard from '@/components/PostCard';

// Reusable component used to display the stories at the top of the feed.
import StoryRow from '@/components/StoryRow';

// Provides the light and dark theme colours.
import { Colors } from '@/constants/theme';

// Contains the post data displayed in the Home feed.
import { homePosts } from '@/data/post';

// Main component for the Home tab.
export default function HomeScreen() {

  // Gets the current device colour scheme.
  const colorScheme = useColorScheme();

  // Selects the light or dark theme based on the device setting.
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    // SafeAreaView prevents the content from overlapping the device's status bar.
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      edges={['top']}
    >

      {/* Header containing the add button, Instagram title, and heart button. */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >

        {/* Add button on the left side of the header. */}
        <Text
          style={[
            styles.headerButton,
            { color: theme.text },
          ]}
        >
          +
        </Text>

        {/* App title displayed in the center of the header. */}
        <Text
          style={[
            styles.logo,
            { color: theme.text },
          ]}
        >
          Instagram
        </Text>

        {/* Heart button on the right side of the header. */}
        <Text
          style={[
            styles.headerButton,
            { color: theme.text },
          ]}
        >
          ♡
        </Text>
      </View>

      {/* Displays the reusable stories section underneath the header. */}
      <StoryRow />

      {/* Displays all posts in the Home feed. */}
      <FlatList
        // Uses the posts stored in the homePosts data array.
        data={homePosts}

        // Uses each post's unique ID as the list key instead of its index.
        keyExtractor={(item) => item.id.toString()}

        // Creates a PostCard component for every post in the list.
        renderItem={({ item }) => (
          <PostCard
            // Passes the current post's data to the reusable PostCard component.
            post={item}

            // Opens the Post Details Stack screen when the post is selected.
            onDetailsPress={() =>
              router.push({
                pathname: '/post/[id]',
                params: {
                  // Passes the selected post ID to the details screen.
                  id: item.id.toString(),
                },
              })
            }
          />
        )}

        // Hides the scroll bar to give the feed a cleaner Instagram-style appearance.
        showsVerticalScrollIndicator={false}

        // Uses the selected theme's background colour for the feed.
        style={{
          backgroundColor: theme.background,
        }}
      />
    </SafeAreaView>
  );
}

// Styles used by the Home screen.
const styles = StyleSheet.create({

  // Makes the Home screen fill the available space.
  container: {
    flex: 1,
  },

  // Creates the layout for the top header.
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },

  // Styling shared by the add and heart buttons.
  headerButton: {
    fontSize: 36,
    fontWeight: '300',
    width: 50,
    textAlign: 'center',
  },

  // Styling for the Instagram title in the center of the header.
  logo: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -1,
  },
});