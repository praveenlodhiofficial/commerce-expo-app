import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ── Types ──────────────────────────────────────────────────────────────────
type DayStatus = "active" | "missed" | "future";

interface WeekDay {
  label: string;
  status: DayStatus;
}

// ── Day Circle ─────────────────────────────────────────────────────────────
const DayCircle = ({ day, status }: { day: string; status: DayStatus }) => {
  const circleClass =
    status === "active"
      ? "bg-blue-500"
      : status === "missed"
        ? "bg-gray-200"
        : "bg-gray-100";

  const symbol = status === "active" ? "✓" : status === "missed" ? "✕" : "—";

  const symbolClass =
    status === "active"
      ? "text-white font-semibold"
      : "text-gray-400 font-medium";

  return (
    <View className="items-center gap-y-1">
      <Text className="text-xs font-medium text-gray-500">{day}</Text>
      <View
        className={`h-9 w-9 items-center justify-center rounded-full ${circleClass}`}
      >
        <Text className={`text-sm ${symbolClass}`}>{symbol}</Text>
      </View>
    </View>
  );
};

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: number;
  label: string;
}) => (
  <View className="m-1.5 flex-1 items-center rounded-2xl bg-white px-3 py-5 shadow-sm">
    <Text className="mb-1 text-3xl">{emoji}</Text>
    <Text className="mb-1 text-3xl font-bold text-gray-800">{value}</Text>
    <Text className="text-center text-xs leading-4 text-gray-400">{label}</Text>
  </View>
);

// ── Main Screen ────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const weekDays: WeekDay[] = [
    { label: "M", status: "missed" },
    { label: "Tu", status: "missed" },
    { label: "W", status: "future" },
    { label: "Th", status: "future" },
    { label: "F", status: "future" },
    { label: "S", status: "future" },
    { label: "Su", status: "future" },
  ];

  const activeDaysThisWeek = weekDays.filter(
    (d) => d.status === "active"
  ).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ── Header ── */}
      <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <TouchableOpacity className="p-1.5">
          <Text className="text-2xl text-gray-700">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-900">
          My Profile
        </Text>
        <TouchableOpacity className="p-1.5">
          <Text className="text-xl text-red-400">⇥</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View className="mb-3 items-center bg-white px-5 pt-8 pb-7">
          {/* Avatar */}
          <View className="relative mb-4">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-blue-400">
              <Text className="text-3xl font-bold tracking-widest text-white">
                PL
              </Text>
            </View>
            <TouchableOpacity className="absolute right-0 bottom-0 h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-500">
              <Text className="text-xs text-white">📷</Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            Praveen Lodhi
          </Text>

          {/* Edit / Password buttons */}
          <View className="mb-5 flex-row gap-x-3">
            <TouchableOpacity className="flex-row items-center gap-x-1.5 rounded-full border border-gray-200 px-4 py-2">
              <Text className="text-sm text-blue-500">✏️</Text>
              <Text className="text-sm font-medium text-blue-500">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-1.5 rounded-full border border-gray-200 px-4 py-2">
              <Text className="text-sm text-blue-500">🔑</Text>
              <Text className="text-sm font-medium text-blue-500">
                Change Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upgrade Plan */}
          <TouchableOpacity className="mb-6 w-full flex-row items-center justify-center gap-x-2 rounded-full bg-indigo-600 px-8 py-3.5">
            <Text className="text-base text-white">🚀</Text>
            <Text className="text-base font-semibold text-white">
              Upgrade Plan
            </Text>
          </TouchableOpacity>

          {/* XP Bar */}
          <View className="mb-1 w-full">
            <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <View className="h-full w-0 rounded-full bg-indigo-400" />
            </View>
          </View>
          <Text className="mb-5 text-xs text-gray-400">
            Level & XP Coming Soon
          </Text>

          {/* Friends */}
          <Text className="text-3xl font-bold text-gray-800">0</Text>
          <Text className="mb-4 text-sm text-gray-400">Friends</Text>

          <View className="flex-row gap-x-3">
            <TouchableOpacity className="flex-row items-center gap-x-1.5 rounded-full bg-blue-50 px-5 py-2.5">
              <Text className="text-sm text-blue-500">👥</Text>
              <Text className="text-sm font-medium text-blue-500">
                Find Friends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-1.5 rounded-full bg-gray-100 px-5 py-2.5">
              <Text className="text-sm text-gray-500">✉️</Text>
              <Text className="text-sm font-medium text-gray-500">
                Requests
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── My Why ── */}
        <View className="mx-3 mb-3 rounded-2xl bg-white p-5 shadow-sm">
          <View className="mb-3 flex-row items-center gap-x-3">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-pink-50">
              <Text className="text-lg">❤️</Text>
            </View>
            <Text className="text-base font-bold text-gray-800">My Why</Text>
          </View>
          <View className="mb-4 h-px bg-gray-100" />
          <Text className="mb-3 text-sm leading-6 text-gray-700">
            I'm doing it because I want to improve myself.{"\n"}I refuse to keep
            myself stagnant when it comes to learning.{"\n"}
            I'm becoming a better version of myself
          </Text>
          <Text className="mb-4 text-xs text-gray-400">
            Last updated: Apr 5, 2026
          </Text>
          <TouchableOpacity className="flex-row items-center justify-center gap-x-2 rounded-xl bg-pink-50 py-3">
            <Text className="text-sm text-pink-500">✏️</Text>
            <Text className="text-sm font-semibold text-pink-500">
              Edit My Why
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Weekly Activity ── */}
        <View className="mx-3 mb-3 rounded-2xl bg-white p-5 shadow-sm">
          <View className="mb-5 flex-row items-center gap-x-2">
            <Text className="text-xl">🔥</Text>
            <Text className="text-base font-bold text-gray-800">
              Weekly Activity
            </Text>
          </View>
          <View className="mb-4 flex-row justify-between">
            {weekDays.map((d) => (
              <DayCircle key={d.label} day={d.label} status={d.status} />
            ))}
          </View>
          <Text className="text-center text-xs text-gray-400">
            {activeDaysThisWeek} / 7 days active this week
          </Text>
        </View>

        {/* ── Statistics ── */}
        <Text className="mx-4 mt-2 mb-1 text-lg font-bold text-gray-800">
          Statistics:
        </Text>
        <View className="mx-1.5">
          <View className="flex-row">
            <StatCard emoji="🏆" value={0} label="Challenges completed" />
            <StatCard emoji="🎓" value={0} label="Acquired skills" />
          </View>
          <View className="flex-row">
            <StatCard emoji="📅" value={0} label="Active days streak" />
            <StatCard emoji="🔥" value={0} label="Total active days" />
          </View>
        </View>

        {/* ── My Badges ── */}
        <Text className="mx-4 mt-4 mb-2 text-lg font-bold text-gray-800">
          My badges
        </Text>
        <View className="mx-3 mb-3 items-center rounded-2xl bg-white p-8 shadow-sm">
          <Text className="mb-3 text-5xl text-gray-300">🏅</Text>
          <Text className="mb-1 text-base font-semibold text-gray-500">
            Badges Coming Soon
          </Text>
          <Text className="text-center text-xs leading-5 text-gray-400">
            Earn badges by completing skills and challenges
          </Text>
        </View>

        {/* ── Skill Progress ── */}
        <Text className="mx-4 mt-2 mb-2 text-lg font-bold text-gray-800">
          Skill progress
        </Text>
        <View className="mx-3 mb-3 items-center rounded-2xl bg-white p-8 shadow-sm">
          <Text className="mb-3 text-5xl text-gray-300">📖</Text>
          <Text className="mb-1 text-base font-semibold text-gray-500">
            No Progress Yet
          </Text>
          <Text className="text-center text-xs leading-5 text-gray-400">
            Start learning skills to track your progress here
          </Text>
        </View>

        {/* ── Member Since ── */}
        <Text className="mt-4 text-center text-xs text-gray-400">
          Member since April 2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
