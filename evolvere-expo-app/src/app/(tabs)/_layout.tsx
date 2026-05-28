// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      // Home screen
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      // Wellness screen
      <Tabs.Screen name="two" options={{ title: "Wellness Check" }} />
      // Journal entry screen
      <Tabs.Screen name="three" options={{ title: "Journal Entry" }} />
    </Tabs>
  );
}