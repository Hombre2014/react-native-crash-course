import { useState } from 'react';
import { Models } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';

import { images } from '@/constants';
import useAppwrite from '@/lib/useAppwrite';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';

import Trending from '@/components/Trending';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as unknown as VideoProps[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard videoItem={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="items-start flex-row justify-between mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="font-psemibold text-2xl text-white">User</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="font-pregular text-lg text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
