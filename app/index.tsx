import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Logo from '../assets/images/icon.png';
import MainImage from '../assets/images/main.png';
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full"> 
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full justify-center items-center gap-8 pb-10">

          <View className="flex-row items-center gap-3">
            <Image source={Logo} className="w-10 h-10 pr-2" />
            <Text className="text-3xl font-bold">Zindex</Text>
          </View>

          <Text className="text-center leading-relaxed">Your Kindle Library {'\n'}All Highlights in one place</Text>
          {/* <Text>All Highlights in one place</Text> */}

          {/* <Image source={MainImage} className="w-auto h-96 rounded-md" /> */}
          <View className="w-3/5 max-h-96 bg-red-200 rounded-md overflow-hidden" >
            <Image source={MainImage} className="w-full h-full" resizeMode="cover" />
          </View>
          <Text className="text-sm">Just a few taps to get your kindle notes organized</Text>

          {/* <Link href="/login">Sign in</Link> */}
          <CustomButton 
            title="Sign Up / Login" 
            onPress={() => router.push('/login')} 
            textStyle="text-white"
            buttonStyle="bg-secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
