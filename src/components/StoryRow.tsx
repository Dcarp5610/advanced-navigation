// React Native components used to create the horizontal stories section.
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// Provides the application's light and dark theme colours.
import { Colors } from '@/constants/theme';

// Sample story data displayed across the top of the Home feed.
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

// Reusable component that displays the horizontal stories section.
export default function StoryRow() {

  // Gets the current device colour scheme.
  const colorScheme = useColorScheme();

  // Selects the appropriate light or dark theme.
  const theme =
    Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    // Container around the entire stories section.
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >

      {/* Allows the stories to scroll horizontally. */}
      <ScrollView
        horizontal

        // Hides the horizontal scroll bar for a cleaner Instagram-style design.
        showsHorizontalScrollIndicator={false}

        // Adds spacing around the stories.
        contentContainerStyle={styles.storyList}
      >

        {/* Creates a story item for every object in the stories array. */}
        {stories.map((story) => (

          // Uses the story's unique ID as the React key.
          <View
            key={story.id}
            style={styles.story}
          >

            {/* Circular border surrounding each story image. */}
            <View style={styles.storyBorder}>

              {/* Displays the user's story profile image. */}
              <Image
                source={{ uri: story.image }}
                style={styles.storyImage}
              />

              {/* Only displays the plus button for Your Story. */}
              {story.ownStory && (
                <View
                  style={[
                    styles.addButton,
                    {
                      // Changes the plus button background
                      // depending on the current theme.
                      backgroundColor:
                        colorScheme === 'dark'
                          ? '#ffffff'
                          : '#000000',

                      // Uses the app background as the button border.
                      borderColor: theme.background,
                    },
                  ]}
                >

                  {/* Plus symbol used to add a new story. */}
                  <Text
                    style={[
                      styles.addText,
                      {
                        // Makes the plus symbol contrast with the button.
                        color:
                          colorScheme === 'dark'
                            ? '#000000'
                            : '#ffffff',
                      },
                    ]}
                  >
                    +
                  </Text>
                </View>
              )}
            </View>

            {/* Displays the username underneath the story image. */}
            <Text
              style={[
                styles.username,
                { color: theme.text },
              ]}
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

// Styles used by the StoryRow component.
const styles = StyleSheet.create({

  // Container around the stories with a bottom border.
  container: {
    borderBottomWidth: 1,
  },

  // Controls the horizontal scrolling area's spacing.
  storyList: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },

  // Controls the width and alignment of each individual story.
  story: {
    width: 100,
    alignItems: 'center',
    marginRight: 2,
  },

  // Creates the circular coloured border around each story.
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

  // Makes each story profile image circular.
  storyImage: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },

  // Positions the plus button over the bottom-right
  // of the Your Story profile image.
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

  // Styling for the plus symbol.
  addText: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 24,
  },

  // Styling for the username underneath each story.
  username: {
    fontSize: 12,
    maxWidth: 94,
    textAlign: 'center',
  },
});