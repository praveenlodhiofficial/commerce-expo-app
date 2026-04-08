import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface ContinueLessonProps {
  trackName: string;
  lessonTitle: string;
  lessonNumber: number;
  totalLessons: number;
  onPress: () => void;
}

export function ContinueLesson({
  trackName,
  lessonTitle,
  lessonNumber,
  totalLessons,
  onPress,
}: ContinueLessonProps) {
  const progress = lessonNumber / totalLessons;
  const progressPercent = Math.round(progress * 100);

  return (
    <View className="mx-5">
      <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
        Continue where you left off
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        className="bg-card rounded-2xl p-5"
      >
        {/* Top row */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            {/* Track icon dot */}
            <View className="w-8 h-8 rounded-full bg-foreground items-center justify-center">
              <Text className="text-background text-xs font-bold">M</Text>
            </View>
            <Text className="text-xs font-medium text-muted-foreground">
              {trackName}
            </Text>
          </View>

          {/* Lesson count */}
          <Text className="text-xs text-muted-foreground">
            {lessonNumber}/{totalLessons} lessons
          </Text>
        </View>

        {/* Lesson title */}
        <Text className="text-base font-bold text-foreground mb-4">
          {lessonTitle}
        </Text>

        {/* Progress bar + CTA row */}
        <View className="flex-row items-center gap-3">
          {/* Progress bar */}
          <View className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <View
              className="h-full bg-foreground rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </View>

          {/* Resume button */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onPress}
            className="bg-foreground px-4 py-2 rounded-xl"
          >
            <Text className="text-background text-xs font-bold">
              Resume →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress label */}
        <Text className="text-xs text-muted-foreground mt-2">
          {progressPercent}% complete
        </Text>
      </TouchableOpacity>
    </View>
  );
}