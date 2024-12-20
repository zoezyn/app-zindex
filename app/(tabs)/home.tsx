import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native'
import React from 'react'
import MainImage from '../../assets/images/main.png';
import CustomButton from '@/components/CustomButton';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';


const Home = () => {
  return (
    <SafeAreaView className='bg-primary flex-1'>
      
      <ScrollView >
        <View className='flex flex-col w-full h-64 gap-5'>
          <Image source={MainImage} className='w-full h-full' resizeMode='cover' />
          <View className='absolute top-0 left-0 w-full h-full bg-black opacity-55' />
          <View className='absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Text className='text-white text-4xl font-bold text-center leading-snug'>Organize Your Kindle Highlights in Fewest Steps</Text>
          </View>
          </View>


          <Text className='text-base text-center leading-normal my-4'>
            Access your book insights anywhere, anytime.{'\n'}
            Stop losing track of your valuable book insights.
          </Text>

          <CustomButton 
            title="Upload Your Notes"
            onPress={() => {/* handle upload */}}
            buttonStyle="bg-secondary w-64 mx-auto rounded-3xl my-2"
            textStyle="text-white"
          />

          <Text className='text-left text-3xl font-medium pt-6 pl-6 my-4'>How it works?</Text>
          <View className='mt-2'>
            {/* <Text className='text-2xl font-bold mb-6'>How it works</Text> */}
            
            <View className='flex flex-row flex-wrap gap-4 px-5 justify-between mb-4'>
              <View style={styles.stepCard}>
                <View className='flex flex-row items-center gap-2 mb-2'>
                  <Entypo name="laptop" size={24} color="black" className='mb-1' />
                  <Text className='font-bold'>Step 1:</Text>
                </View>
                <Text>Connect your kindle to laptop with USB cable</Text>
              </View>

              <View style={styles.stepCard}>
                <View className='flex flex-row items-center gap-2 mb-2'>
                  <Feather name="upload-cloud" size={24} color="black" />
                  <Text className='font-bold'>Step 2:</Text>
                </View>
                <Text>Go to 〈Kindle/documents/My Clippings.txt〉 file and upload it to here</Text>
              </View>

              <View style={styles.stepCard}>
                <View className='flex flex-row items-center gap-2 mb-2'>
                  <Feather name="smartphone" size={24} color="black" />
                  <Text className='font-bold'>Step 3:</Text>
                </View>
                <Text>Browse and organize your notes</Text>
              </View>
            
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = {
  stepCard: {
    width: '48%',
    height: 160,
    backgroundColor: '#DBF4E9',
    shadowColor: "#000",
    padding: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8
  }
}

export default Home