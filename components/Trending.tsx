import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import {
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { icons } from '@/constants';

const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1.1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

type TrendingItemProps = {
  item: Post;
  activeItem: Post;
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      duration={500}
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          shouldPlay
          useNativeControls
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative flex justify-center items-center"
        >
          <ImageBackground
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />

          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type Post = {
  $id: string;
  title: string;
  video: string;
  creator: string;
  thumbnail: string;
};

type TrendingProps = {
  posts: Post[];
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  type ViewableItemsProps = {
    viewableItems: {
      key: string;
    }[];
  };

  const viewableItemsChanged = ({ viewableItems }: ViewableItemsProps) => {
    if (viewableItems.length > 0) {
      const activePost = posts.find(
        (post) => post.$id === viewableItems[0].key
      );
      if (activePost) {
        setActiveItem(activePost);
      }
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      contentOffset={{ x: 170, y: 0 }}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
    />
  );
};

export default Trending;
