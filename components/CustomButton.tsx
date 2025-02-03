import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  isLoading?: boolean;
  textStyles?: object;
  containerStyles?: string;
  handlePress?: () => void;
}

const CustomButton = ({
  title,
  isLoading,
  textStyles,
  handlePress,
  containerStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={handlePress}
      className={`bg-secondary w-full rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
    >
      <Text
        onPress={handlePress}
        className={`text-primary font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
