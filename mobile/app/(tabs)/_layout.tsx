import React from "react";

import { ActivityIndicator, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Tabs } from "expo-router";

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
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else {
            iconName = "ellipse";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen
        name="cart"
        options={{ title: "Cart" }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              // Prevent default action
              e.preventDefault();
              router.push("/auth/login");
            }
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
        listeners={{
          tabPress: (e) => {
            if (!isAuthenticated) {
              // Prevent default action
              e.preventDefault();
              router.push("/auth/login");
            }
          },
        }}
      />

      {/* <Tabs.Screen name="cart" options={{ title: "Cart" }} /> */}
      {/* <Tabs.Screen name="profile" options={{ title: "Profile" }} /> */}
    </Tabs>
  );
}
