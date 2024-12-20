import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import BookIcon from '../../assets/images/book-icon.png';
import MainImage from '../../assets/images/main.png';
import React from "react";

import { Ionicons } from '@expo/vector-icons';

export default function BookPage() {
  const { title } = useLocalSearchParams();
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  

    useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user);
        if (user) {
        fetchBookNotes(user.id, decodeURIComponent(title as string));
        }
    }).catch(error => {
        console.error('Error getting user:', error);
    });
    }, [title]);


    const fetchBookNotes = async (userId: string, bookTitle: string) => {
        const { data, error } = await supabase
            .from('book_notes')
            .select('*')
            .ilike('book_title', bookTitle)
            .eq('user_id', userId)  // Add this line to filter by user_id
            .order('created_at', { ascending: false });  // Get newest first

        if (error) {
            alert(error.message);
        } else if (data) {
            setNotes(data);
        }
    };

      
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
      <View className='flex flex-col w-full h-16 gap-4'>
          <Image source={MainImage} className='w-full h-full' resizeMode='cover' />
        </View>
        <Pressable 
          className="p-4 pb-0 flex-row items-center"
          onPress={() => router.back()}
        >

          <Ionicons name="chevron-back" size={24} color="black" />
          {/* <Text className="ml-2">Back</Text> */}
        </Pressable>

        <View className="items-center p-4 flex-row ">
          <Image source={BookIcon} className="w-32 h-32" resizeMode="contain" />
          <Text className="flex-1 text-xl font-semibold">{decodeURIComponent(title as string)}</Text>
        </View>

        <View className="p-4">
          {notes.map((note) => (

            <View key={note.id} className="mb-4 rounded-lg p-4">
              {Array.isArray(note.notes) ? (
                note.notes.map((item: string, index: number) => (
                  <Text key={index} className="text-base mb-2 last:mb-0">
                    • {item}
                  </Text>
                ))
              ) : (
                <Text className="text-base">{note.notes}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 