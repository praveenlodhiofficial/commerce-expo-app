import React from "react";
import { ScrollView, Text, View } from "react-native";

import { AppTheme } from "@/constants/theme";
import { FoundationLesson } from "@/components/FoundationLesson";
import { SkillsCarousel } from "@/components/SkillsCarousel";

export default function SkillsPage() {
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: AppTheme.colors.background }}
      contentContainerStyle={{ gap: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-3">
        <Text style={{ fontSize: 30, fontWeight: "800", color: AppTheme.colors.text }}>
          Hi, Praveen
        </Text>
        <Text style={{ marginTop: 4, fontSize: 16, color: AppTheme.colors.textMuted }}>
          Pick your next focus area for this week.
        </Text>
      </View>
      <SkillsCarousel />
      <FoundationLesson />
    </ScrollView>
  );
}
