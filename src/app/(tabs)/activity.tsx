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
const profileImage = require('../../../assets/Outfits/outfit1.jpg');

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.username}>ootd.everyday</Text>
          <Ionicons name="chevron-down" size={15} color="#ffffff" />
          <View style={styles.notificationDot} />
        </View>

        <Pressable style={styles.composeButton}>
          <Ionicons name="create-outline" size={25} color="#ffffff" />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9a9da7" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9a9da7"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.notesRow}>
        <View style={styles.noteItem}>
          <View style={styles.noteBubble}>
            <Text style={styles.noteBubbleText}>
              Your thoughts{'\n'}go here...
            </Text>
          </View>

          <View style={styles.noteImageWrapper}>
            <Image source={profileImage} style={styles.noteImage} />
          </View>

          <Text style={styles.noteTitle}>Your note</Text>
          <Text style={styles.noteSubtitle}> Location off</Text>
        </View>

        <View style={styles.mapItem}>
          <View style={styles.mapCircle}>
            <Ionicons name="globe-outline" size={36} color="#7090ff" />
          </View>
          <Text style={styles.noteTitle}>Map</Text>
        </View>
      </View>

      <View style={styles.messagesHeader}>
        <Text style={styles.messagesTitle}>Messages</Text>
        <Pressable>
          <Text style={styles.requestsText}>Requests</Text>
        </Pressable>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={styles.messageRow}>
            <View style={styles.profileWrapper}>
              <Image
                source={{ uri: item.profileImage }}
                style={styles.messageProfileImage}
              />
              {item.online && <View style={styles.onlineDot} />}
            </View>

            <View style={styles.messageContent}>
              <Text
                style={[
                  styles.messageUsername,
                  item.unread && styles.unreadUsername,
                ]}
              >
                {item.username}
              </Text>

              <View style={styles.previewRow}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.messagePreview,
                    item.unread && styles.unreadPreview,
                  ]}
                >
                  {item.message}
                </Text>

                {item.time !== '' && (
                  <>
                    <Text style={styles.separator}> · </Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                  </>
                )}
              </View>
            </View>

            {item.unread && <View style={styles.unreadDot} />}
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
    height: 58,
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
    fontSize: 20,
    fontWeight: '700',
    marginRight: 4,
  },
  notificationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ff3040',
    marginLeft: 6,
  },
  composeButton: {
    position: 'absolute',
    right: 20,
    top: 9,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    height: 42,
    width: screenWidth - 44,
    marginLeft: 22,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24272f',
  },
  searchInput: {
    flex: 1,
    height: 42,
    marginLeft: 7,
    color: '#ffffff',
    fontSize: 15,
  },
  notesRow: {
    height: 175,
    position: 'relative',
  },
  noteItem: {
    position: 'absolute',
    left: 30,
    top: 0,
    width: 100,
    alignItems: 'center',
  },
  mapItem: {
    position: 'absolute',
    left: 140,
    top: 0,
    width: 100,
    alignItems: 'center',
  },
  noteBubble: {
    position: 'absolute',
    top: 0,
    left: -5,
    zIndex: 2,
    backgroundColor: '#30343d',
    borderRadius: 17,
    paddingHorizontal: 9,
    paddingVertical: 7,
    width: 112,
  },
  noteBubbleText: {
    color: '#aeb2bd',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
  },
  noteImageWrapper: {
    marginTop: 38,
    position: 'relative',
  },
  noteImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: '#3d414b',
  },
  noteTitle: {
    color: '#aeb2bd',
    fontSize: 15,
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
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1d3d88',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
    borderWidth: 1,
    borderColor: '#29458a',
  },
  messagesHeader: {
    paddingHorizontal: 24,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  messagesTitle: {
    color: '#ffffff',
    fontSize: 21,
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
    minHeight: 68,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  messageProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#35d35b',
    borderWidth: 2,
    borderColor: '#080b11',
  },
  messageContent: {
    flex: 1,
  },
  messageUsername: {
    color: '#ffffff',
    fontSize: 14,
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
    fontSize: 13,
    flexShrink: 1,
  },
  unreadPreview: {
    color: '#ffffff',
    fontWeight: '600',
  },
  separator: {
    color: '#777b86',
    fontSize: 13,
  },
  messageTime: {
    color: '#8f939d',
    fontSize: 13,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#5b7cff',
    marginLeft: 8,
  },
});