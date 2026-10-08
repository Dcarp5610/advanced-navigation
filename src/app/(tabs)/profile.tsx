// Imports the React Native components used to build the Profile screen.
import { StyleSheet, Text, View } from 'react-native';

// Main component for the Profile tab.
export default function ProfileScreen() {
  return (
    // Main container for the Profile screen.
    <View style={styles.container}>

      {/* Displays the Profile page title. */}
      <Text style={styles.title}>
        Profile
      </Text>
    </View>
  );
}

// Styles used by the Profile screen.
const styles = StyleSheet.create({

  // Centers the Profile content both vertically and horizontally.
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styling for the Profile title.
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});