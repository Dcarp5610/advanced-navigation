import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostCard from '@/components/PostCard';
import StoryRow from '../components/StoryRow';
import { homePosts } from '@/data/post';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Home header */}
      <View style={styles.header}>
        <Text style={styles.logo}>OOTD Everyday</Text>
      </View>

      {/* Stories */}
      <StoryRow />

      {/* Home feed */}
      <FlatList
        data={homePosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => console.log(`Post ${item.id} pressed`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  logo: {
    fontSize: 22,
    fontWeight: '700',
  },
});