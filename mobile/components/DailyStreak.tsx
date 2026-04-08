import React from "react";
import { Text, View } from "react-native";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DailyStreakProps {
  currentStreak: number;
  longestStreak: number;
  todayComplete: boolean;
}

export function DailyStreak({ currentStreak, longestStreak, todayComplete }: DailyStreakProps) {
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <View className="mx-5 border border-amber-600 rounded-4xl">
      <View className="bg-card rounded-2xl p-5 gap-4">

        {/* Header row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl">🔥</Text>
            <View>
              <Text className="text-xl font-extrabold text-foreground">
                {currentStreak} day streak
              </Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                Best: {longestStreak} days
              </Text>
            </View>
          </View>

          {/* Today badge */}
          <View className={todayComplete ? "bg-green-500/10 rounded-xl px-3 py-1.5" : "bg-white/5 rounded-xl px-3 py-1.5"}>
            <Text className={todayComplete ? "text-sm font-semibold text-green-500" : "text-sm font-semibold text-muted-foreground"}>
              {todayComplete ? "Done today ✓" : "Not yet today"}
            </Text>
          </View>
        </View>

        {/* Day dots */}
        <View className="flex-row justify-between">
          {DAYS.map((day, index) => {
            const isPast = index < todayIndex;
            const isToday = index === todayIndex;
            const isCompleted = isPast || (isToday && todayComplete);

            return (
              <View key={day} className="items-center gap-1.5">
                <View
                  className={[
                    "w-9 h-9 rounded-full items-center justify-center",
                    isCompleted
                      ? "bg-orange-500"
                      : isToday
                      ? "bg-orange-500/10 border-2 border-orange-500"
                      : "bg-white/10",
                  ].join(" ")}
                >
                  {isCompleted && (
                    <Text className="text-white text-sm font-bold">✓</Text>
                  )}
                </View>
                <Text
                  className={[
                    "text-[11px]",
                    isToday
                      ? "font-bold text-foreground"
                      : "font-normal text-muted-foreground",
                  ].join(" ")}
                >
                  {day}
                </Text>
              </View>
            );
          })}
        </View>

      </View>
    </View>
  );
}