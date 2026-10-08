// Provides the icons used throughout the Search/Explore screen.
import { Ionicons } from '@expo/vector-icons';

// Provides navigation to the Post Details Stack screen.
import { router } from 'expo-router';

// React hooks used for storing search/category state
// and efficiently filtering the posts.
import { useMemo, useState } from 'react';

// React Native components used to build the Explore screen.
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

// Keeps the screen content inside the device's safe area.
import { SafeAreaView } from 'react-native-safe-area-context';

// Provides the light and dark theme colours.
import { Colors } from '@/constants/theme';

// Contains the posts displayed in the Explore grid.
import { explorePosts } from '@/data/post';

// Gets the width of the device screen.
const screenWidth = Dimensions.get('window').width;

// Controls the small amount of spacing between grid images.
const gridGap = 2;

// Calculates the width and height of each image
// so exactly three columns fit across the screen.
const gridImageSize =
  (screenWidth - gridGap * 2) / 3;

// Categories displayed above the Explore grid.
const categories = [
  'For you',
  'Volleyball',
  'Food',
  'Cliff Diving',
  'Travel',
  'Style',
];

// Stores the IDs of posts that should display
// a video/play icon and view count.
const videoPostIds = new Set([
  201,
  202,
  204,
  205,
  206,
  208,
  209,
  211,
  212,
  214,
  215,
  217,
  218,
  220,
  221,
  223,
  224,
]);

// Stores the view count displayed for each video post.
const viewCounts: Record<number, string> = {
  201: '719K',
  202: '2.8M',
  203: '413K',
  204: '1.2M',
  205: '289K',
  206: '8.8M',
  207: '1.8M',
  208: '7.7M',
  209: '1.8M',
  210: '4M',
  211: '213K',
  212: '936K',
  213: '582K',
  214: '1.4M',
  215: '3.2M',
  216: '641K',
  217: '2.1M',
  218: '5.6M',
  219: '428K',
  220: '1.1M',
  221: '892K',
  222: '356K',
  223: '2.4M',
  224: '674K',
};

// Main component for the Search/Explore tab.
export default function SearchScreen() {

  // Gets the current device colour scheme.
  const colorScheme = useColorScheme();

  // Selects the appropriate light or dark theme.
  const theme =
    Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Stores the text entered into the search field.
  const [searchText, setSearchText] = useState('');

  // Stores which category button is currently selected.
  const [selectedCategory, setSelectedCategory] =
    useState('For you');

  // Filters the Explore posts based on the search text.
  const filteredPosts = useMemo(() => {

    // Removes extra spaces and makes the search lowercase
    // so the search is not case-sensitive.
    const query = searchText.trim().toLowerCase();

    // If there is no search text, display every Explore post.
    if (!query) {
      return explorePosts;
    }

    // Searches usernames, captions, and locations for the entered text.
    return explorePosts.filter(
      (post) =>
        post.username.toLowerCase().includes(query) ||
        post.caption.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query),
    );

  // Recalculates the filtered results whenever the search text changes.
  }, [searchText]);

  return (
    // Keeps the Explore screen inside the device's safe area.
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      edges={['top']}
    >

      {/* Contains the search bar and category buttons. */}
      <View style={styles.topSection}>

        {/* Row containing the search bar and bookmark button. */}
        <View style={styles.searchRow}>

          {/* Search input container. */}
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor:
                  theme.backgroundElement,
              },
            ]}
          >

            {/* Search icon. */}
            <Ionicons
              name="search-outline"
              size={21}
              color={theme.secondaryText}
            />

            {/* Allows the user to enter a search query. */}
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search with Meta AI"
              placeholderTextColor={
                theme.secondaryText
              }
              style={[
                styles.searchInput,
                { color: theme.text },
              ]}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Bookmark button beside the search bar. */}
          <Pressable
            style={styles.bookmarkButton}
            onPress={() => {}}
          >
            <Ionicons
              name="bookmark-outline"
              size={27}
              color={theme.text}
            />
          </Pressable>
        </View>

        {/* Row containing the filter button and categories. */}
        <View style={styles.categoryRow}>

          {/* Filter/options button. */}
          <Pressable
            style={[
              styles.filterButton,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}
            onPress={() => {}}
          >
            <Ionicons
              name="options-outline"
              size={22}
              color={theme.text}
            />
          </Pressable>

          {/* Horizontally scrollable category list. */}
          <FlatList
            horizontal
            data={categories}

            // Uses the category text as its unique key.
            keyExtractor={(item) => item}

            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}

            // Creates a button for each category.
            renderItem={({ item }) => {

              // Checks whether this category is currently selected.
              const selected =
                selectedCategory === item;

              return (
                <Pressable
                  style={[
                    styles.categoryButton,
                    {
                      // Gives the selected category a different background.
                      backgroundColor: selected
                        ? theme.backgroundElement
                        : theme.background,

                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() =>
                    setSelectedCategory(item)
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: theme.text },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>

      {/* Displays an empty state when the search has no results. */}
      {filteredPosts.length === 0 ? (
        <View style={styles.emptyContainer}>

          {/* Search icon for the empty state. */}
          <Ionicons
            name="search-outline"
            size={48}
            color={theme.secondaryText}
          />

          {/* Empty state heading. */}
          <Text
            style={[
              styles.emptyTitle,
              { color: theme.text },
            ]}
          >
            No results found
          </Text>

          {/* Explains what the user can search for. */}
          <Text
            style={[
              styles.emptyText,
              { color: theme.secondaryText },
            ]}
          >
            Try searching for a username, caption, or
            location.
          </Text>
        </View>
      ) : (

        // Displays the filtered posts as a three-column grid.
        <FlatList
          data={filteredPosts}

          // Uses the post ID as the unique list key.
          keyExtractor={(item) => item.id.toString()}

          // Creates three columns across the screen.
          numColumns={3}

          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}

          // Creates each individual Explore grid item.
          renderItem={({ item }) => {

            // Checks whether this post should display
            // the video icon and view count.
            const isVideo = videoPostIds.has(item.id);

            return (
              <Pressable
                style={styles.gridItem}

                // Opens the Post Details screen when an image is selected.
                onPress={() =>
                  router.push({
                    pathname: '/post/[id]',
                    params: {
                      id: item.id.toString(),
                    },
                  })
                }
              >

                {/* Displays the post image. */}
                <Image
                  source={item.image}
                  style={styles.gridImage}
                />

                {/* Adds video information to posts marked as videos. */}
                {isVideo && (
                  <View style={styles.videoOverlay}>

                    {/* Play icon indicates that this post is a video. */}
                    <Ionicons
                      name="play"
                      size={15}
                      color="#ffffff"
                    />

                    {/* Displays the video's view count. */}
                    <Text style={styles.viewCount}>
                      {viewCounts[item.id]}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

// Styles used throughout the Search/Explore screen.
const styles = StyleSheet.create({

  // Main screen container.
  container: {
    flex: 1,
  },

  // Controls the spacing around the top search/category area.
  topSection: {
    paddingTop: 8,
    paddingBottom: 8,
  },

  // Places the search bar and bookmark button horizontally.
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  // Search bar background and layout.
  searchContainer: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  // Text entered into the search bar.
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 9,
    paddingVertical: 0,
  },

  // Bookmark button beside the search bar.
  bookmarkButton: {
    width: 42,
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 7,
  },

  // Row containing the filter button and category list.
  categoryRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },

  // Circular filter/options button.
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  // Controls the spacing between category buttons.
  categoryList: {
    paddingRight: 12,
    gap: 8,
  },

  // Individual category button.
  categoryButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text displayed inside category buttons.
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Adds a small amount of spacing above the image grid.
  grid: {
    paddingTop: 2,
  },

  // Controls the spacing between rows in the image grid.
  row: {
    gap: gridGap,
    marginBottom: gridGap,
  },

  // Controls the size and positioning of each grid item.
  gridItem: {
    width: gridImageSize,
    height: gridImageSize,
    position: 'relative',
    overflow: 'hidden',
  },

  // Makes each Explore image fill its grid item.
  gridImage: {
    width: gridImageSize,
    height: gridImageSize,
    resizeMode: 'cover',
  },

  // Positions the video icon and view count
  // near the bottom-left of a grid image.
  videoOverlay: {
    position: 'absolute',
    left: 8,
    bottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Styling for the number of views.
  viewCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,

    // Adds a dark shadow so the text remains visible
    // over different image backgrounds.
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  // Centers the empty search results message.
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  // Heading displayed when there are no search results.
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },

  // Supporting text displayed below the empty state heading.
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});