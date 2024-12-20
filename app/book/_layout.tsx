import { Stack } from 'expo-router';

export default function BookLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[title]" 
        options={{
          headerShown: false,  // Since we're using custom back button
        }} 
      />
    </Stack>
  );
} 