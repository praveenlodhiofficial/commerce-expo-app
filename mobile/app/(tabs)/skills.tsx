import React from "react";
import { ScrollView, Text, View } from "react-native";

import { DailyStreak } from "@/components/DailyStreak";
import { FoundationLesson } from "@/components/FoundationLesson";
import { SkillsCarousel } from "@/components/SkillsCarousel";

export default function SkillsPage() {
  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerStyle={{ gap: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-3">
        <Text className="text-foreground text-3xl font-extrabold">
          Hi, Praveen
        </Text>
        <Text className="text-muted-foreground mt-1 text-base">
          Pick your next focus area for this week.
        </Text>
      </View>

      <View className="flex flex-col gap-8">
        <DailyStreak
          currentStreak={7}
          longestStreak={14}
          todayComplete={false}
        />

        <SkillsCarousel />
        <FoundationLesson />
      </View>
    </ScrollView>
  );
}
