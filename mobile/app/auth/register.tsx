import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import { AppTheme } from "@/constants/theme";
import { registerWithBackend } from "@/lib/auth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Fill in name, email, and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await registerWithBackend({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      router.replace("/auth/login");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1" style={{ backgroundColor: AppTheme.colors.background }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-4 pb-8">
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
              <Text style={{ fontSize: AppTheme.typography.h1, fontWeight: "800", color: AppTheme.colors.text, marginBottom: 4 }}>
                Create account
              </Text>
              <Text style={{ fontSize: AppTheme.typography.body, color: AppTheme.colors.textMuted, marginBottom: 24 }}>
                Build better habits with your tribe.
              </Text>

              {errorMessage ? (
                <View className="mb-4 rounded-2xl bg-red-50 px-4 py-3" style={{ borderWidth: 1, borderColor: "#F8CDD3" }}>
                  <Text className="text-sm text-red-600">{errorMessage}</Text>
                </View>
              ) : null}

              <View className="mb-4 gap-2">
                <Text style={{ color: AppTheme.colors.textMuted, fontSize: 13, fontWeight: "600" }}>Name</Text>
                <TextInput
                  className="rounded-2xl border px-4 py-3"
                  style={{ borderColor: AppTheme.colors.border, fontSize: AppTheme.typography.body }}
                  placeholder="John Doe"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className="mb-4 gap-2">
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

              <View className="mb-3 gap-2">
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

                <Text className="mb-4 text-right text-sm" style={{ color: AppTheme.colors.primary }}>
                  Forgot Password?
                </Text>

                <Pressable
                  onPress={handleRegister}
                  disabled={isSubmitting}
                  className="mb-3 rounded-2xl py-4 disabled:opacity-60"
                  style={{ backgroundColor: AppTheme.colors.primary }}
                >
                  <Text className="text-center text-base font-semibold text-white">
                    {isSubmitting ? "Creating account..." : "Register"}
                  </Text>
                </Pressable>

                <Text style={{ textAlign: "center", fontSize: 14, color: AppTheme.colors.textMuted }}>
                  Already have an account?{" "}
                  <Link href="/auth/login" style={{ fontWeight: "700", color: AppTheme.colors.primary }}>
                    Login
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
