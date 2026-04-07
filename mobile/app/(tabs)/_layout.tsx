import React from "react";
import { ActivityIndicator, View } from "react-native";

import { Redirect, Tabs } from "expo-router";

import CustomTabBar from "@/components/CustomTabBar";
import { AppTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

export default function HomeLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: AppTheme.colors.background }}>
        <ActivityIndicator size="large" color={AppTheme.colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: AppTheme.colors.background,
        },
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "700",
          color: AppTheme.colors.text,
        },
        headerTitleAlign: "left",
      }}
    >
      <Tabs.Screen name="skills" options={{ title: "Discover" }} />
      <Tabs.Screen name="tribe" options={{ title: "Tribe" }} />
      <Tabs.Screen name="challenges" options={{ title: "Challenges" }} />
      <Tabs.Screen name="wall" options={{ title: "Wall" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
