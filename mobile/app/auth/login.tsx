import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import { AppTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await login({
        email: email.trim().toLowerCase(),
        password,
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: AppTheme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-end px-4 pb-8">
        <View
          className="rounded-[40px] border p-6"
          style={{
            borderColor: AppTheme.colors.border,
            backgroundColor: AppTheme.colors.surface,
            shadowColor: "#29161D",
            shadowOpacity: 0.08,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 8 },
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: AppTheme.typography.h1,
              color: AppTheme.colors.text,
              fontWeight: "800",
              marginBottom: 4,
            }}
          >
            Welcome back
          </Text>
          <Text
            style={{
              fontSize: AppTheme.typography.body,
              color: AppTheme.colors.textMuted,
              marginBottom: 24,
            }}
          >
            Sign in to continue your growth streak.
          </Text>

        {errorMessage ? (
          <View className="mb-4 rounded-2xl bg-red-50 px-4 py-3" style={{ borderWidth: 1, borderColor: "#F8CDD3" }}>
            <Text className="text-sm text-red-600">{errorMessage}</Text>
          </View>
        ) : null}

        <View className="mb-4 flex flex-col gap-2">
          <Text style={{ color: AppTheme.colors.textMuted, fontSize: 13, fontWeight: "600" }}>Email</Text>
          <TextInput
            className="rounded-2xl border px-4 py-3"
            style={{ borderColor: AppTheme.colors.border, fontSize: AppTheme.typography.body }}
            placeholder="user@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mb-3 flex flex-col gap-2">
          <Text style={{ color: AppTheme.colors.textMuted, fontSize: 13, fontWeight: "600" }}>Password</Text>

          <View className="flex-row items-center rounded-2xl border px-3" style={{ borderColor: AppTheme.colors.border }}>
            <TextInput
              className="flex-1 py-3"
              style={{ fontSize: AppTheme.typography.body }}
              placeholder="********"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={AppTheme.colors.textMuted}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={isSubmitting}
            className="mt-8 mb-3 rounded-2xl py-4 disabled:opacity-60"
            style={{ backgroundColor: AppTheme.colors.primary }}
          >
            <Text className="text-center text-base font-semibold text-white">
              {isSubmitting ? "Logging in..." : "Login"}
            </Text>
          </Pressable>

          <Text style={{ textAlign: "center", fontSize: 14, color: AppTheme.colors.textMuted }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" style={{ color: AppTheme.colors.primary, fontWeight: "700" }}>
              Register
            </Link>
          </Text>
        </View>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}
