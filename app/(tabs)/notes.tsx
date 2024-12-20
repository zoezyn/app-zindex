import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainImage from '../../assets/images/main.png';
import BookIcon from '../../assets/images/book-icon.png';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useRouter } from 'expo-router';


const BookCard = ({ title }: { title: string }) => {

  return (
    <View className=" p-4 flex-row items-center gap-4">
      <Image source={BookIcon} resizeMode='cover'/>

      <Text className="text-base font-medium max-w-64"
        numberOfLines={2}
        ellipsizeMode="tail"
        

      >
        {title}
      </Text>
    </View>
  )
}


const Notes = () => {

  const API_URL = 'http://127.0.0.1:8000'
  
  const [user, setUser] = useState<any>(null);
  const [userNotes, setUserNotes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)  // Add this line
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter(); 

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {

      setUser(user)
      
      if (user) fetchUserNotes(user.id) // Fetch notes after confirming user
      setLoading(false)
    })
  }, [])


  const fetchUserNotes = async (userId: string) => {
    try {
      
      const { data, error } = await supabase
        .from('book_notes')
      .select('*')
      .eq('user_id', userId)
    
      if (data) setUserNotes(data)
      if (error) throw error
    } catch (error: any) {
      alert(`Error fetching notes: ${error.message}`)
    }
  }


  const uploadFile = async () => {
    if (!selectedFile || !user) return;
    
    setIsUploading(true);

    try {

        const reader = new FileReader()
        
        // Read file and Convert file to text first
        const text = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsText(selectedFile)
        })

        // 2. Process with Python backend
        const response = await fetch(`${API_URL}/process-notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: text })
        });
        if (!response.ok) throw new Error('Failed to process notes');
        const processedData = await response.json()

        // 3. Save the file to the database
        for (const [bookTitle, notes] of Object.entries(processedData)) {
            const { error } = await supabase
                .from('book_notes')
                .insert({ 
                    user_id: user.id,
                    book_title: bookTitle.trim(),
                    notes: notes,        // array of [note_content, note_location]
                    // location: (notes as [string, string])[1],
                    file_name: selectedFile.name,
                    created_at: new Date().toISOString()
                })
                .select()
                if (error) throw error
                else fetchUserNotes(user.id)  // Refresh notes list
                // reader.readAsText(selectedFile)
        }
        setSelectedFile(null); // Clear selected file after successful upload
        
      } catch (error) {
        alert('Failed to upload file. Please try again.');
      } finally {
        setIsUploading(false); // Set loading state to false when done
      }
  }

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('book_notes')
      .delete()
      .eq('id', noteId)
    if (error) throw error
    else if (user) fetchUserNotes(user.id)  // Refresh notes list
  }

  // Add deleteAll function
  const deleteAllNotes = async () => {
    if (!user || userNotes.length === 0) return;
    
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('book_notes')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Refresh notes list (will be empty)
      await fetchUserNotes(user.id);
    } catch (error) {
      console.error('Error deleting all notes:', error);
      alert('Failed to delete notes');
    }
  };

  return (
    
    <SafeAreaView className='bg-primary flex-1'>
      <GestureHandlerRootView>
        <ScrollView>
          <View className='flex flex-col w-full h-24 gap-5'>
          <Image source={MainImage} className='w-full h-full' resizeMode='cover' />
        </View>
        <Text className="text-4xl font-bold p-6">Dashboard</Text>

        {/* Notes Section */}
        <View className="px-4">
          <SwipeListView
            data={userNotes}
            renderItem={({ item }) => (
              // <View className="bg-primary">
              //   <BookCard title={item.book_title} />
              // </View>
              <Pressable 
              className="bg-primary"
                onPress={() => router.push(`/book/${encodeURIComponent(item.book_title)}`)}
              >
                <BookCard title={item.book_title} />
              </Pressable>
            )}
            renderHiddenItem={({ item }) => (
              <View className="flex-1 flex-row justify-end bg-red-500">
                <Pressable
                  className="w-20  justify-center items-center"
                  onPress={() => {
                    Alert.alert(
                      'Delete Note',
                      'Are you sure you want to delete this note?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { 
                          text: 'Delete', 
                          style: 'destructive',
                          onPress: () => deleteNote(item.id)
                        }
                      ]
                    )
                  }}
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </Pressable>
              </View>
            )}
            // leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe={true}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            scrollEnabled={false} 
          />

        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
    
  )
}

export default Notes