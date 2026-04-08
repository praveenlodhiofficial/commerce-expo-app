import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

export default function NotificationScreen() {
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
    <SafeAreaView>
      <Text>Notification</Text>
    </SafeAreaView>
  );
}