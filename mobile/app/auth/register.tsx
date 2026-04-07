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
      <View className="flex-1 bg-blue-300">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-3">
            <View className="rounded-[60px] rounded-tl-[999px] bg-white/80 p-5 shadow-inner shadow-white/70 backdrop-blur-2xl">
              <Text className="mb-8 text-4xl font-medium">Register</Text>

              {errorMessage ? (
                <View className="mb-4 rounded-2xl bg-red-50 px-4 py-3">
                  <Text className="text-sm text-red-600">{errorMessage}</Text>
                </View>
              ) : null}

              {/* Name */}
              <View className="mb-3 gap-1">
                <Text className="text-gray-500">Name</Text>
                <TextInput
                  className="rounded-xl border border-zinc-400 py-2 pl-2"
                  placeholder="John Doe"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View className="mb-3 gap-1">
                <Text className="text-gray-500">Email</Text>
                <TextInput
                  className="rounded-xl border border-zinc-400 py-2 pl-2"
                  placeholder="user@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password */}
              <View className="mb-3 gap-1">
                <Text className="text-gray-500">Password</Text>

                <View className="flex-row items-center rounded-xl border border-zinc-400 pr-3">
                  <TextInput
                    className="flex-1 py-2 pr-2 pl-2"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />

                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="gray"
                    />
                  </Pressable>
                </View>

                {/* Forgot Password */}
                <Text className="mb-5 text-right text-sm text-blue-500">
                  Forgot Password ?
                </Text>

                <Pressable
                  onPress={handleRegister}
                  disabled={isSubmitting}
                  className="mb-3 rounded-xl bg-blue-500 py-4 disabled:opacity-60"
                >
                  <Text className="text-center text-white">
                    {isSubmitting ? "Creating account..." : "Register"}
                  </Text>
                </Pressable>

                <Text className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-blue-500"
                  >
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
