import { Text, View, StyleSheet, Pressable, Alert, Image, SafeAreaView } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import MainImage from '../../assets/images/main.png';

export default function Profile() {
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
              router.replace("/");  // Navigate to login/home screen
            } catch (error) {
              Alert.alert("Error", "Failed to sign out");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className='bg-primary flex-1 gap-4'>
        <View className='flex flex-col w-full h-24 gap-5'>
          <Image source={MainImage} className='w-full h-full' resizeMode='cover' />
        </View>

        <View className='flex flex-col items-center justify-between rounded-lg p-4 flex-1'>
      <Text className="text-2xl font-semibold mb-8">You are logged in</Text>
      
      <Pressable 
        onPress={handleSignOut}
        className="bg-red-500 px-6 py-3 rounded-lg w-32 mx-auto"
      >
        <Text className="text-white font-semibold text-center">
          Sign Out
        </Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
