import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export default function CustomButton({ title, onPress, textStyle, buttonStyle }: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`justify-center items-center py-3 px-8 rounded-md ${buttonStyle}`}
    >
      <Text className={`font-pregular ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}