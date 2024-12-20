import React from 'react'
import { Tabs } from 'expo-router'
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';


const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00704E',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#F3FEF7',
        },
      }}
      >
        <Tabs.Screen 
          name="home"
          options={{ 
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Foundation name="home" color={color} size={size} />
            ),
        }}
        />

        <Tabs.Screen 
          name="notes"
          options={{ 
            title: "Notes",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="file-text" color={color} size={size} />
            ),
        }}
        />

        <Tabs.Screen 
          name="profile"
          options={{ 
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
        }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;