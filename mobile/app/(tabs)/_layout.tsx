import React from "react";
import { ActivityIndicator, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Tabs } from "expo-router";

import CustomTabBar from "@/components/CustomTabBar";
import { useAuth } from "@/hooks/use-auth";

export default function HomeLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#EAF5FF]">
        <ActivityIndicator size="large" color="#0F5BD1" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
<Tabs
  tabBar={(props) => <CustomTabBar {...props} />}
  screenOptions={{ headerShown: true }}
>
  <Tabs.Screen name="skills" />
  <Tabs.Screen name="tribe" />
  <Tabs.Screen name="challenges" />
  <Tabs.Screen name="wall" />
  <Tabs.Screen name="profile" />
</Tabs>
  );
}
