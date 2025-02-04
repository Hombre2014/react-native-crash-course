import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Redirect, Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
// import { useGlobalContext } from "../../context/GlobalProvider";

import { icons } from '../../constants';
// import { Loader } from "../../components";

interface TabLayoutProps {
  icon: any;
  name: string;
  color: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabLayoutProps) => {
  return (
    <View className="flex items-center justify-center py-2 h-full gap-2">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-6 h-6 mb-1"
      />
    </View>
  );
};

const TabLayout = () => {
  // const { isLoading, isLoggedIn } = useGlobalContext();

  // if (!isLoading && !isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            height: 84,
            paddingTop: 20,
            borderTopWidth: 0,
            borderTopColor: '#232533',
            backgroundColor: '#161622',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                color={color}
                icon={icons.home}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Bookmark"
                focused={focused}
                icon={icons.bookmark}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Create"
                color={color}
                icon={icons.plus}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Profile"
                focused={focused}
                icon={icons.profile}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={isLoading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
