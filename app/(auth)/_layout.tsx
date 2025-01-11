import React, { useEffect, useState } from 'react'
import { Alert, Platform, SafeAreaView, View, Image, Text, ScrollView,TextInput } from 'react-native'
import { supabase } from '@/lib/supabase'
import Logo from '../../assets/images/icon.png';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import Constants from "expo-constants";
import * as AppleAuthentication from 'expo-apple-authentication'
import { AppleAuth } from '../../components/AppleSignInButton'
import { GoogleAuth } from '../../components/GoogleSignInButton'
export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const GOOGLE_IOS_CLIENT_ID = Constants.expoConfig?.extra?.googleIosClientId
  const GOOGLE_ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.googleAndroidClientId
  const [loading, setLoading] = useState(false)


  const webClientId = Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID

  
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: webClientId,
    iosClientId: GOOGLE_IOS_CLIENT_ID
  })
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/home'); // Redirect to home if already logged in
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);


  async function logInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification.')
    setLoading(false)
  }

  async function resetPassword() {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        Alert.alert(error.message)
      } else {
        Alert.alert(
          'Password Reset',
          'Check your email for the password reset link',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'Failed to send reset password email. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }

  return (
    <SafeAreaView className='h-full bg-[#12926B]'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>

        <View className='p-8 my-6 gap-4'>

          <View className="flex-row items-center gap-3 mt-4">
            <Image source={Logo} className="w-10 h-10 pr-2" />
            <Text className="text-3xl text-white font-bold">Zindex</Text>
          </View>

          <View className='gap-2 mt-4'>
            <Text className='text-white'>Email</Text>
            <TextInput
              className='bg-primary rounded-lg p-2 h-12'
              // label="Email"
              // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>

          <View className='gap-2 mt-4'>
            <Text className='text-white'>Password</Text>
            <TextInput
              className='bg-primary rounded-lg p-2 h-12'
              // label="Email"
              // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              // placeholder="email@address.com"
              autoCapitalize={'none'}
              secureTextEntry={true}
            />

          </View>
          {/* <Text className='text-white'>{email}</Text> */}

          <View className='flex-row justify-center items-center'>
            <CustomButton 
                title="Forgot Password" 
                onPress={() => resetPassword()}
                textStyle="text-white underline"
                // buttonStyle="py-3 px-18"
              />
          </View>

        <View className='mt-12 gap-8'>
        <CustomButton 
            title="Login" 
            onPress={() => logInWithEmail()}
            textStyle="text-black"
            buttonStyle="bg-primary w-48 mx-auto rounded-lg"
          />

        <CustomButton 
            title="Sign Up" 
            onPress={() => signUpWithEmail()}
            textStyle="text-black"
            buttonStyle="bg-primary w-48 mx-auto rounded-lg"
          />
        </View>
      <View className='flex-col mt-12 items-center gap-4'>
        <Text className='text-white'>Or Login with</Text>

      {/* <GoogleSigninButton
      size={GoogleSigninButton.Size.Icon}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const userInfo = await GoogleSignin.signIn()
          if (userInfo?.data?.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo?.data?.idToken,
            })
          } else {
            throw new Error('no ID token present!')
          }
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
        }}
        /> */}
        <View className='flex-row gap-4 justify-center items-center'>
          <GoogleAuth />
          <AppleAuth />
        </View>
      </View>




        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
