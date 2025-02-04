import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, ScrollView, Alert } from 'react-native';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { getCurrentUser, signIn } from '@/lib/appwrite';

const SignIn = () => {
  // const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      // If the user is not redirected once is logged in, use the following code
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLoggedIn(true);

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
