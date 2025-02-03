import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '@/constants';

interface FormFieldProps {
  title: string;
  value: string;
  otherStyles?: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FormField = ({
  title,
  value,
  otherStyles,
  placeholder,
  handleChangeText,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          className="flex-1 text-white font-psemibold text-base"
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
