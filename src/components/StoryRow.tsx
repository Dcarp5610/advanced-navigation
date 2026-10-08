import { ScrollView, StyleSheet, Text, View } from 'react-native';

const stories = [
  {
    id: 1,
    username: 'Your Story',
    initials: 'You',
  },
  {
    id: 2,
    username: 'alex.m',
    initials: 'AM',
  },
  {
    id: 3,
    username: 'sarah.lee',
    initials: 'SL',
  },
  {
    id: 4,
    username: 'mike.travels',
    initials: 'MT',
  },
  {
    id: 5,
    username: 'jess.eats',
    initials: 'JE',
  },
  {
    id: 6,
    username: 'daniel.daily',
    initials: 'DD',
  },
  {
    id: 7,
    username: 'emily.jpg',
    initials: 'EJ',
  },
];

export default function StoryRow() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
      >
        {stories.map((story) => (
          <View key={story.id} style={styles.story}>
            <View style={styles.storyCircle}>
              <Text style={styles.initials}>{story.initials}</Text>
            </View>

            <Text style={styles.username} numberOfLines={1}>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  storyList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  story: {
    width: 72,
    alignItems: 'center',
    marginRight: 8,
  },

  storyCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1689c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  initials: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  username: {
    fontSize: 11,
    color: '#333333',
    maxWidth: 68,
    textAlign: 'center',
  },
});