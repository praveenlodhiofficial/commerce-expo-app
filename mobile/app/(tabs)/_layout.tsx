import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs, useRouter } from "expo-router";

import CustomTabBar from "@/components/CustomTabBar";
import { AppTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

export default function HomeLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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
        headerRightContainerStyle: {
          paddingRight: 14,
        },
        headerRight: () => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            onPress={() => router.push("/notifications")}
            hitSlop={8}
          >
            <Ionicons name="notifications-outline" size={24} color={AppTheme.colors.text} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen name="skills" options={{ title: "Discover" }} />
      <Tabs.Screen name="tribe" options={{ title: "Tribe" }} />
      <Tabs.Screen name="challenges" options={{ title: "Challenges" }} />
      <Tabs.Screen name="wall" options={{ title: "Wall" }} />
      {/* in proflie header false */}
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }}   />
    </Tabs>
  );
}
