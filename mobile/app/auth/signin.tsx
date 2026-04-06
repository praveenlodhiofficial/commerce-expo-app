import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Handle sign-in logic here
  };

  return (
    <View className="flex h-screen justify-end bg-red-300 p-3">
      <View className="flex h-[80vh] flex-col justify-end rounded-[60px] rounded-tl-[999px] bg-white/50 p-5 shadow-inner shadow-white/70 backdrop-blur-2xl">
        <Text className="mb-10 text-4xl font-medium">Sign In</Text>

        {/* Username */}
        <View className="mb-3 flex flex-col gap-1">
          <Text className="text-gray-500">Username</Text>
          <TextInput
            className="rounded-xl border border-zinc-400 py-2 pl-2"
            placeholder="John Doe"
          />
        </View>

        {/* Email */}
        <View className="mb-3 flex flex-col gap-1">
          <Text className="text-gray-500">Email</Text>
          <TextInput
            className="rounded-xl border border-zinc-400 py-2 pl-2"
            placeholder="user@gmail.com"
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
            onPress={handleSignIn}
            className="mt-10 mb-3 rounded-xl bg-red-500 py-4"
          >
            <Text className="text-center text-white">Sign In</Text>
          </Pressable>

          <Text className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-red-500">
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
