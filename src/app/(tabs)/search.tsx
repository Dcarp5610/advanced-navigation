import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { explorePosts } from '@/data/post';

const screenWidth = Dimensions.get('window').width;
const gridGap = 2;
const gridImageSize = (screenWidth - gridGap * 2) / 3;

const categories = [
  'For you',
  'Volleyball',
  'Food',
  'Cliff Diving',
  'Travel',
  'Style',
];

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

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('For you');

  const filteredPosts = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return explorePosts;
    }

    return explorePosts.filter(
      (post) =>
        post.username.toLowerCase().includes(query) ||
        post.caption.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query),
    );
  }, [searchText]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      edges={['top']}
    >
      <View style={styles.topSection}>
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: theme.backgroundElement,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={21}
              color={theme.secondaryText}
            />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search with Meta AI"
              placeholderTextColor={theme.secondaryText}
              style={[
                styles.searchInput,
                { color: theme.text },
              ]}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

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

        <View style={styles.categoryRow}>
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

          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => {
              const selected = selectedCategory === item;

              return (
                <Pressable
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selected
                        ? theme.backgroundElement
                        : theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(item)}
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

      {filteredPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search-outline"
            size={48}
            color={theme.secondaryText}
          />

          <Text
            style={[
              styles.emptyTitle,
              { color: theme.text },
            ]}
          >
            No results found
          </Text>

          <Text
            style={[
              styles.emptyText,
              { color: theme.secondaryText },
            ]}
          >
            Try searching for a username, caption, or location.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => {
            const isVideo = videoPostIds.has(item.id);

            return (
              <Pressable
                style={styles.gridItem}
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
                  style={styles.gridImage}
                />

                {isVideo && (
                  <View style={styles.videoOverlay}>
                    <Ionicons
                      name="play"
                      size={15}
                      color="#ffffff"
                    />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    paddingTop: 8,
    paddingBottom: 8,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchContainer: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 9,
    paddingVertical: 0,
  },

  bookmarkButton: {
    width: 42,
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 7,
  },

  categoryRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },

  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  categoryList: {
    paddingRight: 12,
    gap: 8,
  },

  categoryButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },

  grid: {
    paddingTop: 2,
  },

  row: {
    gap: gridGap,
    marginBottom: gridGap,
  },

  gridItem: {
    width: gridImageSize,
    height: gridImageSize,
    position: 'relative',
    overflow: 'hidden',
  },

  gridImage: {
    width: gridImageSize,
    height: gridImageSize,
    resizeMode: 'cover',
  },

  videoOverlay: {
    position: 'absolute',
    left: 8,
    bottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});