import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            resizeMode="contain"
            source={images.logo}
            className="w=[130px] h-[84px]"
          />
          <Image
            resizeMode="contain"
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
          />
          <View className="relative mt-5">
            <Text className="text-white font-bold text-3xl text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>

          <Text className="text-gray-100 text-center text-sm font-pregular mt-7 mb-8">
            Where creativity meets innovation: embark on a journey of limitless
            explanations with Aora
          </Text>

          <CustomButton
            isLoading={false}
            handlePress={() => router.push('/sign-in')}
            title="Continue with Email"
            textStyles={{ color: '#161622' }}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
