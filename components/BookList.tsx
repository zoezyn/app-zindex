import { Text, View } from "react-native";
import React from "react";
import BookIcon from '../../assets/images/book-icon.png';


export default function BookList({ title }: { title: string }) {
  return (
    <View>
      <Image source={BookIcon} />
      <Text className="text-lg font-bold">{title}</Text>
    </View>
  )
}