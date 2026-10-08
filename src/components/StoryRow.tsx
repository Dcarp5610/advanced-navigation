import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { Colors } from '@/constants/theme';

const stories = [
  {
    id: 1,
    username: 'Your Story',
    image: 'https://picsum.photos/100/100?random=208',
    ownStory: true,
  },
  {
    id: 2,
    username: 'alex.m',
    image: 'https://picsum.photos/100/100?random=202',
    ownStory: false,
  },
  {
    id: 3,
    username: 'sarah.lee',
    image: 'https://picsum.photos/100/100?random=203',
    ownStory: false,
  },
  {
    id: 4,
    username: 'mike.travels',
    image: 'https://picsum.photos/100/100?random=204',
    ownStory: false,
  },
  {
    id: 5,
    username: 'jess.eats',
    image: 'https://picsum.photos/100/100?random=205',
    ownStory: false,
  },
  {
    id: 6,
    username: 'daniel.daily',
    image: 'https://picsum.photos/100/100?random=206',
    ownStory: false,
  },
];

export default function StoryRow() {
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
      >
        {stories.map((story) => (
          <View key={story.id} style={styles.story}>
            <View style={styles.storyBorder}>
              <Image
                source={{ uri: story.image }}
                style={styles.storyImage}
              />

              {story.ownStory && (
                <View
                  style={[
                    styles.addButton,
                    {
                      backgroundColor:
                        colorScheme === 'dark' ? '#ffffff' : '#000000',
                      borderColor: theme.background,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.addText,
                      {
                        color:
                          colorScheme === 'dark' ? '#000000' : '#ffffff',
                      },
                    ]}
                  >
                    +
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={[styles.username, { color: theme.text }]}
              numberOfLines={1}
            >
              {story.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  storyList: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  story: {
    width: 100,
    alignItems: 'center',
    marginRight: 2,
  },
  storyBorder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#d62976',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 7,
  },
  storyImage: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  addButton: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 24,
  },
  username: {
    fontSize: 12,
    maxWidth: 94,
    textAlign: 'center',
  },
});