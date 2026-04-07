import { useState } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <View className="flex-1 bg-[#EAF5FF] px-6 py-8">
      <View className="rounded-3xl bg-white px-5 py-6 shadow-sm shadow-black/10">
        <Text className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F5BD1]">
          Profile
        </Text>
        <Text className="mt-2 text-2xl font-semibold text-[#0D1B2A]">
          {user?.name ?? "Guest"}
        </Text>
        <Text className="mt-1 text-base text-slate-600">
          {user?.email ?? "No email available"}
        </Text>

        <Pressable
          onPress={handleLogout}
          disabled={isLoggingOut}
          className="mt-8 rounded-2xl bg-[#0F5BD1] px-4 py-4 active:opacity-90 disabled:opacity-70"
        >
          <View className="flex-row items-center justify-center gap-2">
            {isLoggingOut ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : null}
            <Text className="text-center text-base font-semibold text-white">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
