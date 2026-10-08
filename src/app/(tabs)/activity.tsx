// Provides Ionicons for the icons used throughout the Messages screen.
import { Ionicons } from '@expo/vector-icons';

// Provides Expo Router navigation so we can open individual message screens.
import { router } from 'expo-router';

// Imports the React Native components used to build the screen.
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

// Keeps the screen content inside the safe area of the device.
import { SafeAreaView } from 'react-native-safe-area-context';

// Defines the structure of each message in the messages list.
interface Message {
  id: number;
  username: string;
  profileImage: string;
  message: string;
  time: string;
  unread: boolean;
  online: boolean;
}

// Sample message data used to populate the Instagram-style inbox.
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

// Gets the width of the device screen.
// This is used to size the search bar relative to the screen.
const screenWidth = Dimensions.get('window').width;

// Main component for the Messages tab.
export default function MessagesScreen() {
  return (
    // SafeAreaView keeps the screen content away from the device's unsafe areas.
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* Top header containing the account name and compose button. */}
      <View style={styles.header}>

        {/* Centers the username, dropdown arrow, and notification dot. */}
        <View style={styles.headerTitle}>

          {/* Displays the account name at the top of the Messages screen. */}
          <Text style={styles.username}>
            ootd.everyday
          </Text>

          {/* Small arrow beside the username. */}
          <Ionicons
            name="chevron-down"
            size={16}
            color="#ffffff"
          />

          {/* Red notification indicator. */}
          <View style={styles.notificationDot} />
        </View>

        {/* Button for the compose/new message action. */}
        <Pressable style={styles.composeButton}>
          <Ionicons
            name="create-outline"
            size={27}
            color="#ffffff"
          />
        </Pressable>
      </View>

      {/* Search bar section. */}
      <View style={styles.searchContainer}>

        {/* Search icon. */}
        <Ionicons
          name="search"
          size={18}
          color="#9a9da7"
        />

        {/* Text input for searching messages. */}
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9a9da7"
          style={styles.searchInput}
        />
      </View>

      {/* Notes and Map section near the top of the inbox. */}
      <View style={styles.notesRow}>

        {/* Your Note section. */}
        <View style={styles.noteItem}>

          {/* Speech bubble above the profile picture. */}
          <View style={styles.noteBubble}>
            <Text style={styles.noteBubbleText}>
              Your thoughts{'\n'}go here...
            </Text>
          </View>

          {/* Profile image and plus button for creating a note. */}
          <View style={styles.noteImageWrapper}>

            {/* Profile image used for Your Note. */}
            <Image
              source={{
                uri: 'https://picsum.photos/id/1027/150/150',
              }}
              style={styles.noteImage}
            />

            {/* Blue plus button placed over the profile image. */}
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>
                +
              </Text>
            </View>
          </View>

          {/* Name underneath the profile image. */}
          <Text style={styles.noteTitle}>
            Your note
          </Text>

          {/* Location status underneath the note name. */}
          <Text style={styles.noteSubtitle}>
            📍 Location off
          </Text>
        </View>

        {/* Map section beside Your Note. */}
        <View style={styles.mapItem}>

          {/* Circular Map icon. */}
          <View style={styles.mapCircle}>
            <Ionicons
              name="globe-outline"
              size={38}
              color="#7090ff"
            />
          </View>

          {/* Map label. */}
          <Text style={styles.noteTitle}>
            Map
          </Text>
        </View>
      </View>

      {/* Header above the actual message list. */}
      <View style={styles.messagesHeader}>

        {/* Messages title. */}
        <Text style={styles.messagesTitle}>
          Messages
        </Text>

        {/* Requests button/label. */}
        <Pressable>
          <Text style={styles.requestsText}>
            Requests
          </Text>
        </Pressable>
      </View>

      {/* FlatList efficiently displays all of the messages. */}
      <FlatList
        data={messages}

        // Uses each message's unique ID instead of the array index.
        keyExtractor={(item) => item.id.toString()}

        // Hides the vertical scroll bar for an Instagram-style appearance.
        showsVerticalScrollIndicator={false}

        // Adds spacing to the bottom of the list.
        contentContainerStyle={styles.messageList}

        // Creates the visual layout for each message.
        renderItem={({ item }) => (
          <Pressable
            style={styles.messageRow}

            // Opens the individual message Stack screen when a message is pressed.
            onPress={() =>
              router.push({
                pathname: '/message/[id]',
                params: {
                  id: item.id.toString(),
                },
              })
            }
          >
            {/* Profile picture and online indicator. */}
            <View style={styles.profileWrapper}>

              {/* Displays the user's profile picture. */}
              <Image
                source={{
                  uri: item.profileImage,
                }}
                style={styles.profileImage}
              />

              {/* Only displays the green online indicator when online is true. */}
              {item.online && (
                <View style={styles.onlineDot} />
              )}
            </View>

            {/* Contains the username and message preview. */}
            <View style={styles.messageContent}>

              {/* Username becomes bold when the message is unread. */}
              <Text
                style={[
                  styles.messageUsername,
                  item.unread &&
                    styles.unreadUsername,
                ]}
              >
                {item.username}
              </Text>

              {/* Contains the message preview and optional time. */}
              <View style={styles.previewRow}>

                {/* Displays the latest message or notification. */}
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

                {/* Only displays the separator and time when a time exists. */}
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

            {/* Blue dot indicates an unread message. */}
            {item.unread && (
              <View style={styles.unreadDot} />
            )}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

// Styles used throughout the Messages screen.
const styles = StyleSheet.create({

  // Main screen background and layout.
  container: {
    flex: 1,
    backgroundColor: '#080b11',
  },

  // Top header containing the username and compose button.
  header: {
    height: 64,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Keeps the username, arrow, and notification dot together.
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Styling for the account name.
  username: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  // Small red notification indicator.
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3040',
    marginLeft: 6,
  },

  // Positions the compose button on the right side of the header.
  composeButton: {
    position: 'absolute',
    right: 22,
    top: 11,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search bar container.
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

  // Text input inside the search bar.
  searchInput: {
    flex: 1,
    height: 46,
    marginLeft: 7,
    color: '#ffffff',
    fontSize: 16,
  },

  // Area containing Your Note and Map.
  notesRow: {
    height: 185,
    position: 'relative',
  },

  // Positions the Your Note section.
  noteItem: {
    position: 'absolute',
    left: 42,
    top: 0,
    width: 80,
    alignItems: 'center',
  },

  // Positions the Map section closer to Your Note.
  mapItem: {
    position: 'absolute',
    left: 155,
    top: 0,
    width: 80,
    alignItems: 'center',
  },

  // Speech bubble displayed above the Your Note image.
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

  // Text inside the note speech bubble.
  noteBubbleText: {
    color: '#aeb2bd',
    fontSize: 12,
    lineHeight: 15,
  },

  // Positions the profile image underneath the speech bubble.
  noteImageWrapper: {
    marginTop: 39,
    position: 'relative',
  },

  // Circular profile image for Your Note.
  noteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#3d414b',
  },

  // Blue plus button attached to the profile image.
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

  // Plus symbol inside the badge.
  plusText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 19,
  },

  // Labels used underneath the note and map circles.
  noteTitle: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },

  // Location text underneath Your Note.
  noteSubtitle: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },

  // Circular Map background.
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

  // Header containing "Messages" and "Requests".
  messagesHeader: {
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  // Main Messages heading.
  messagesTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  // Requests text on the right side of the Messages heading.
  requestsText: {
    color: '#9ca0ab',
    fontSize: 15,
    fontWeight: '600',
  },

  // Adds space below the final message.
  messageList: {
    paddingBottom: 70,
  },

  // Layout for each individual message row.
  messageRow: {
    minHeight: 72,
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Holds the profile picture and online indicator.
  profileWrapper: {
    position: 'relative',
    marginRight: 16,
  },

  // Circular profile image displayed beside each message.
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  // Green dot showing that a user is online.
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

  // Allows the username and message preview to use the remaining space.
  messageContent: {
    flex: 1,
  },

  // Default username styling.
  messageUsername: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },

  // Makes usernames bold when their message is unread.
  unreadUsername: {
    fontWeight: '700',
  },

  // Places the message preview and time beside each other.
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },

  // Default styling for the message preview.
  messagePreview: {
    color: '#a7aab3',
    fontSize: 14,
    maxWidth: '76%',
  },

  // Makes unread message previews brighter and slightly bolder.
  unreadPreview: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Separator between the message preview and time.
  separator: {
    color: '#777b86',
    fontSize: 14,
  },

  // Displays how long ago the message was received.
  messageTime: {
    color: '#8f939d',
    fontSize: 14,
  },

  // Blue dot displayed beside unread messages.
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5b7cff',
    marginLeft: 8,
  },
});