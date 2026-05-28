import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { auth } from '../../firebase/config';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const [mood, setMood] = useState("😊");

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user?.email ?? 'null');
    if (!user) {
      router.replace('/');
    }
  });
  return unsubscribe;
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>

      {/* Mood tracker section */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodText}>
          How are you feeling today?
        </Text>
      </View>

      {/* Mood selection buttons */}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {["😞", "😐", "😊", "😁"].map((emoji) => (
          <TouchableOpacity
            key={emoji}
            onPress={() => setMood(emoji)}
          >
            <Text style={{ fontSize: 32, marginHorizontal: 8, marginBottom: 10 }}>
              {emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display selected mood */}
      <Text style={{ marginTop: 10, fontSize: 18, marginBottom: 80 }}>
        Current Mood: {mood}
      </Text>
  
      {/* Navigate to other tabs */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(tabs)/two')}
        >
          <Text style={styles.navText}>Wellness Check</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(tabs)/three')}
        >
          <Text style={styles.navText}>Journal Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
        try {
          await auth.signOut();
          router.replace('/');
        } catch (error: any) {
          alert('Sign out failed: ' + error.message);
        }
      }}
      >
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA', 
  },
  title: {
    fontSize: 40, 
    fontWeight: '800', 
    color: '#1A237E', 
    marginBottom: 80, 
  },
  separator: {
    marginVertical: 30,
    height: 2, 
    width: '80%',
    backgroundColor: '#E8EAF6', 
  },
  // Tab button styling
  navRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: '90%',
  },
  navButton: {
    flex: 1,
    backgroundColor: '#EEF0FF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#C5CAE9',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  navText: {
    color: '#3949AB',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    width: '90%',
    backgroundColor: '#5C6BC0', 
    padding: 20,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6BC0', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, 
    marginTop: 15, 
  },
  text: {
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: '600', 
  },
  moodContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },

  moodText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
});