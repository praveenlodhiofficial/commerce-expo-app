import { Redirect, Tabs, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from "@expo/vector-icons";
import { AppTheme } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
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
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "notification") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else {
            iconName = "ellipse";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',

        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.replace("/auth/login");
            }
          },
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.replace("/auth/login");
            }
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              router.replace("/auth/login");
            }
          },
        }}
      />
    </Tabs>
  );
}
