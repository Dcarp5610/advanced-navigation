import { Ionicons } from '@expo/vector-icons';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  id: number;
  username: string;
  profileImage: string;
  message: string;
  time: string;
  unread: boolean;
  online: boolean;
}

// Static message data used to populate the Messages screen.
const messages: Message[] = [
  {
    id: 1,
    username: 'carp.squad',
    profileImage: 'https://picsum.photos/id/64/100/100',
    message: '4+ new messages',
    time: '2d',
    unread: true,
    online: true,
  },
  {
    id: 2,
    username: 'ace',
    profileImage: 'https://picsum.photos/id/65/100/100',
    message: '2 new messages',
    time: '2d',
    unread: true,
    online: true,
  },
  {
    id: 3,
    username: 'alessia.c',
    profileImage: 'https://picsum.photos/id/91/100/100',
    message: 'Mentioned you in their comment',
    time: '3w',
    unread: false,
    online: false,
  },
  {
    id: 4,
    username: 'stan.p',
    profileImage: 'https://picsum.photos/id/177/100/100',
    message: 'Sent',
    time: '',
    unread: false,
    online: false,
  },
  {
    id: 5,
    username: 'gael.daily',
    profileImage: 'https://picsum.photos/id/342/100/100',
    message: 'Sent',
    time: '',
    unread: false,
    online: false,
  },
  {
    id: 6,
    username: 'alessia.c, diego.c',
    profileImage: 'https://picsum.photos/id/433/100/100',
    message: 'Diego: You weren’t playing about that...',
    time: '',
    unread: false,
    online: false,
  },
  {
    id: 7,
    username: 'claudia',
    profileImage: 'https://picsum.photos/id/338/100/100',
    message: 'Sofia',
    time: '7w',
    unread: false,
    online: false,
  },
];

const screenWidth = Dimensions.get('window').width;

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Instagram-style Messages header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.username}>ootd.everyday</Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#ffffff"
          />

          <View style={styles.notificationDot} />
        </View>

        <Pressable style={styles.composeButton}>
          <Ionicons
            name="create-outline"
            size={27}
            color="#ffffff"
          />
        </Pressable>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#9a9da7"
        />

        <TextInput
          placeholder="Search"
          placeholderTextColor="#9a9da7"
          style={styles.searchInput}
        />
      </View>

      {/* Notes and Map section */}
      <View style={styles.notesRow}>
        <View style={styles.noteItem}>
          <View style={styles.noteBubble}>
            <Text style={styles.noteBubbleText}>
              Your thoughts{'\n'}go here...
            </Text>
          </View>

          <View style={styles.noteImageWrapper}>
            <Image
              source={{
                uri: 'https://picsum.photos/id/1027/150/150',
              }}
              style={styles.noteImage}
            />

            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </View>

          <Text style={styles.noteTitle}>
            Your note
          </Text>

          <Text style={styles.noteSubtitle}>
            📍 Location off
          </Text>
        </View>

        <View style={styles.mapItem}>
          <View style={styles.mapCircle}>
            <Ionicons
              name="globe-outline"
              size={38}
              color="#7090ff"
            />
          </View>

          <Text style={styles.noteTitle}>
            Map
          </Text>
        </View>
      </View>

      {/* Messages and Requests navigation */}
      <View style={styles.messagesHeader}>
        <Text style={styles.messagesTitle}>
          Messages
        </Text>

        <Pressable>
          <Text style={styles.requestsText}>
            Requests
          </Text>
        </Pressable>
      </View>

      {/* Static message list */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={styles.messageRow}>
            {/* Profile picture and online status */}
            <View style={styles.profileWrapper}>
              <Image
                source={{
                  uri: item.profileImage,
                }}
                style={styles.profileImage}
              />

              {item.online && (
                <View style={styles.onlineDot} />
              )}
            </View>

            {/* Username and message preview */}
            <View style={styles.messageContent}>
              <Text
                style={[
                  styles.messageUsername,
                  item.unread &&
                    styles.unreadUsername,
                ]}
              >
                {item.username}
              </Text>

              <View style={styles.previewRow}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.messagePreview,
                    item.unread &&
                      styles.unreadPreview,
                  ]}
                >
                  {item.message}
                </Text>

                {item.time !== '' && (
                  <>
                    <Text style={styles.separator}>
                      {' · '}
                    </Text>

                    <Text style={styles.messageTime}>
                      {item.time}
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Shows a dot for unread messages */}
            {item.unread && (
              <View style={styles.unreadDot} />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080b11',
  },

  header: {
    height: 64,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3040',
    marginLeft: 6,
  },

  composeButton: {
    position: 'absolute',
    right: 22,
    top: 11,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    height: 46,
    width: screenWidth - 48,
    marginLeft: 24,
    marginTop: 0,
    marginBottom: 10,
    paddingHorizontal: 13,
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24272f',
  },

  searchInput: {
    flex: 1,
    height: 46,
    marginLeft: 7,
    color: '#ffffff',
    fontSize: 16,
  },

  notesRow: {
    height: 185,
    position: 'relative',
  },

  noteItem: {
    position: 'absolute',
    left: 42,
    top: 0,
    width: 80,
    alignItems: 'center',
  },

  mapItem: {
    position: 'absolute',
    left: 155,
    top: 0,
    width: 80,
    alignItems: 'center',
  },

  noteBubble: {
    position: 'absolute',
    top: 0,
    left: -17,
    zIndex: 2,
    backgroundColor: '#30343d',
    borderRadius: 16,
    paddingHorizontal: 11,
    paddingVertical: 7,
    width: 110,
  },

  noteBubbleText: {
    color: '#aeb2bd',
    fontSize: 12,
    lineHeight: 15,
  },

  noteImageWrapper: {
    marginTop: 39,
    position: 'relative',
  },

  noteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#3d414b',
  },

  plusBadge: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1683ff',
    borderWidth: 2,
    borderColor: '#080b11',
    alignItems: 'center',
    justifyContent: 'center',
  },

  plusText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 19,
  },

  noteTitle: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },

  noteSubtitle: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },

  mapCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1d3d88',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 39,
    borderWidth: 2,
    borderColor: '#29458a',
  },

  messagesHeader: {
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  messagesTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  requestsText: {
    color: '#9ca0ab',
    fontSize: 15,
    fontWeight: '600',
  },

  messageList: {
    paddingBottom: 70,
  },

  messageRow: {
    minHeight: 72,
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileWrapper: {
    position: 'relative',
    marginRight: 16,
  },

  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#35d35b',
    borderWidth: 2,
    borderColor: '#080b11',
  },

  messageContent: {
    flex: 1,
  },

  messageUsername: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },

  unreadUsername: {
    fontWeight: '700',
  },

  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },

  messagePreview: {
    color: '#a7aab3',
    fontSize: 14,
    maxWidth: '76%',
  },

  unreadPreview: {
    color: '#ffffff',
    fontWeight: '600',
  },

  separator: {
    color: '#777b86',
    fontSize: 14,
  },

  messageTime: {
    color: '#8f939d',
    fontSize: 14,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5b7cff',
    marginLeft: 8,
  },
});