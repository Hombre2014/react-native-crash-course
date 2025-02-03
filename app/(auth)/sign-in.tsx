import { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-35px]"
          />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            otherStyles="mt-7"
            value={form.email}
            keyboardType="email-address"
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />

          <FormField
            title="Password"
            otherStyles="mt-7"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            title="Sign in"
            containerStyles="mt-7"
            isLoading={isSubmitting}
            handlePress={handleSubmit}
          />

          <View className="justify-center flex-row pt-10 gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Don't have an account?
            </Text>
            <Link href="/sign-up">
              <Text className="text-lg text-secondary font-psemibold">
                Sign up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
