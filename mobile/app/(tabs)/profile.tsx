import React from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { AppTheme } from "@/constants/theme";

type ProfileStat = {
  label: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
};

const stats: ProfileStat[] = [
  { label: "Challenges done", value: 0, icon: "trophy-outline" },
  { label: "Skills unlocked", value: 0, icon: "sparkles-outline" },
  { label: "Current streak", value: 0, icon: "flame-outline" },
  { label: "Total active days", value: 0, icon: "calendar-outline" },
];

const week = ["M", "T", "W", "T", "F", "S", "S"];

export default function ProfileScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: AppTheme.colors.background }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={AppTheme.colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 124 }}
      >
        <View className="px-5 pt-3">
          <Text
            style={{
              fontSize: AppTheme.typography.h1,
              fontWeight: "800",
              color: AppTheme.colors.text,
            }}
          >
            Your profile
          </Text>
          <Text
            style={{
              marginTop: 4,
              marginBottom: 16,
              fontSize: AppTheme.typography.body,
              color: AppTheme.colors.textMuted,
            }}
          >
            Track your growth, consistency, and impact.
          </Text>
        </View>

        <View
          className="mx-4 rounded-[28px] border px-5 py-6"
          style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FFD9E1" }}
              >
                <Text style={{ fontSize: 24, fontWeight: "800", color: AppTheme.colors.primaryDeep }}>
                  PL
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 22, fontWeight: "800", color: AppTheme.colors.text }}>
                  Praveen Lodhi
                </Text>
                <Text style={{ marginTop: 2, color: AppTheme.colors.textMuted }}>Member since Apr 2026</Text>
              </View>
            </View>
            <Pressable
              className="h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: AppTheme.colors.surfaceMuted }}
            >
              <Ionicons name="create-outline" size={20} color={AppTheme.colors.text} />
            </Pressable>
          </View>

          <View className="mt-5 flex-row gap-2">
            <Pressable
              className="flex-1 rounded-2xl px-4 py-3"
              style={{ backgroundColor: AppTheme.colors.primary }}
            >
              <Text className="text-center text-sm font-semibold text-white">Edit Profile</Text>
            </Pressable>
            <Pressable
              className="flex-1 rounded-2xl border px-4 py-3"
              style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}
            >
              <Text
                className="text-center text-sm font-semibold"
                style={{ color: AppTheme.colors.text }}
              >
                Change Password
              </Text>
            </Pressable>
          </View>

          <View className="mt-6">
            <View className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: AppTheme.colors.surfaceMuted }}>
              <View className="h-full w-1/3 rounded-full" style={{ backgroundColor: AppTheme.colors.primary }} />
            </View>
            <Text style={{ marginTop: 8, fontSize: 12, color: AppTheme.colors.textMuted }}>
              32 XP this week
            </Text>
          </View>
        </View>

        <View
          className="mx-4 mt-4 rounded-[24px] border p-5"
          style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text style={{ fontSize: 20, fontWeight: "800", color: AppTheme.colors.text }}>
              Weekly activity
            </Text>
            <Text style={{ fontSize: 13, color: AppTheme.colors.textMuted }}>0 / 7 active days</Text>
          </View>
          <View className="flex-row justify-between">
            {week.map((day, index) => (
              <View key={`${day}-${index}`} className="items-center gap-2">
                <Text style={{ fontSize: 12, color: AppTheme.colors.textMuted }}>{day}</Text>
                <View
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: AppTheme.colors.surfaceMuted }}
                >
                  <Text style={{ color: "#A096A3", fontWeight: "700" }}>-</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mx-4 mt-4">
          <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "800", color: AppTheme.colors.text }}>
            Stats
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {stats.map((item) => (
              <View
                key={item.label}
                className="mb-3 w-[48%] rounded-[22px] border p-4"
                style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}
              >
                <Ionicons name={item.icon} size={20} color={AppTheme.colors.primary} />
                <Text style={{ marginTop: 12, fontSize: 26, fontWeight: "800", color: AppTheme.colors.text }}>
                  {item.value}
                </Text>
                <Text style={{ marginTop: 4, fontSize: 13, color: AppTheme.colors.textMuted }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mx-4 mt-2 rounded-[24px] border p-5" style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: AppTheme.colors.text, marginBottom: 8 }}>
            My Why
          </Text>
          <Text style={{ color: AppTheme.colors.text, lineHeight: 24 }}>
            I want to keep improving, one focused day at a time. Small wins compound into a better version of me.
          </Text>
          <Pressable
            className="mt-4 rounded-2xl px-4 py-3 bg-blue-100"
          >
            <Text className="text-center text-sm font-semibold text-blue-600">
              Edit My Why
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
