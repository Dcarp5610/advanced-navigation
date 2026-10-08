import { router } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostCard from '@/components/PostCard';
import StoryRow from '@/components/StoryRow';
import { Colors } from '@/constants/theme';
import { homePosts } from '@/data/post';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['top']}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.headerButton, { color: theme.text }]}>
          +
        </Text>

        <Text style={[styles.logo, { color: theme.text }]}>
          Instagram
        </Text>

        <Text style={[styles.headerButton, { color: theme.text }]}>
          ♡
        </Text>
      </View>

      <StoryRow />

      <FlatList
        data={homePosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onDetailsPress={() =>
              router.push({
                pathname: '/post/[id]',
                params: {
                  id: item.id.toString(),
                },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.background }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },
  headerButton: {
    fontSize: 36,
    fontWeight: '300',
    width: 50,
    textAlign: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -1,
  },
});