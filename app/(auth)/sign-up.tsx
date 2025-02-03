import { useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      // TODO: Handle result - set it to global state

      router.push('/home');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
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
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            otherStyles="mt-10"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

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
            title="Sign up"
            containerStyles="mt-7"
            isLoading={isSubmitting}
            handlePress={handleSubmit}
          />

          <View className="justify-center flex-row pt-10 gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Already have an account?
            </Text>
            <Link href="/sign-in">
              <Text className="text-lg text-secondary font-psemibold">
                Sign in
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
