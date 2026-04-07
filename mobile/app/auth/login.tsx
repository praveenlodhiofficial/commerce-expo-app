import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

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
    <View className="flex h-screen justify-end bg-blue-300 p-3">
      <View className="flex h-[80vh] flex-col justify-end rounded-[60px] rounded-tl-[999px] bg-white/80 p-5 shadow-inner shadow-white/70 backdrop-blur-2xl">
        <Text className="mb-8 text-4xl font-medium">Login</Text>

        {errorMessage ? (
          <View className="mb-4 rounded-2xl bg-red-50 px-4 py-3">
            <Text className="text-sm text-red-600">{errorMessage}</Text>
          </View>
        ) : null}

        {/* Email */}
        <View className="mb-3 flex flex-col gap-1">
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
        <View className="mb-3 flex flex-col gap-1">
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

          <Pressable
            onPress={handleLogin}
            disabled={isSubmitting}
            className="mt-10 mb-3 rounded-xl bg-blue-500 py-4 disabled:opacity-60"
          >
            <Text className="text-center text-white">
              {isSubmitting ? "Logging in..." : "Login"}
            </Text>
          </Pressable>

          <Text className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-blue-500">
              Register
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
