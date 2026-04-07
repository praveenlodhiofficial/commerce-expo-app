import React from "react";
import { ScrollView, Text } from "react-native";

import { FoundationLesson } from "@/components/FoundationLesson";
import { SkillsCarousel } from "@/components/SkillsCarousel";

export default function SkillsPage() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ gap: 20, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="p-4 text-center text-lg"> Hello, Praveen Lodhi</Text>
      <SkillsCarousel />
      <FoundationLesson />
    </ScrollView>
  );
}
