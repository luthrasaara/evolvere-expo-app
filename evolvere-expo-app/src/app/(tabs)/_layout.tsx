// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="two" options={{ title: "Wellness Check" }} />
      <Tabs.Screen name="three" options={{ title: "Journal Entry" }} />
    </Tabs>
  );
}