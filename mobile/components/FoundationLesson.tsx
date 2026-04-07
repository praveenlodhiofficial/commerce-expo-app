import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { AppTheme } from "@/constants/theme";

type Lesson = {
  title: string;
  progress: string;
  locked?: boolean;
};

const lessons: Lesson[] = [
  { title: "Mindset & Beliefs", progress: "0/24", locked: false },
  { title: "Discipline & Habits", progress: "0/24", locked: true },
  { title: "Communication", progress: "0/24", locked: true },
  { title: "Emotional Strength", progress: "0/24", locked: true },
  { title: "Confidence", progress: "0/24", locked: true },
  { title: "Momentum", progress: "0/24", locked: true },
];

function LessonCard({ title, progress, locked }: Lesson) {
  return (
    <View
      className={`relative mb-4 aspect-square h-44 w-[47.5%] overflow-hidden rounded-[28px] ${
        locked ? "pointer-events-none opacity-80" : ""
      } ${locked ? "bg-zinc-500" : "bg-zinc-700"}`}
    >
      <View className="absolute top-0 w-full" />
      <View className="absolute bottom-0 w-full justify-center p-4">
        <Text className="text-center text-xs font-semibold text-white/80">
          {progress}
        </Text>
        <Text className="mt-1 text-center text-sm font-semibold text-white">
          {title}
        </Text>
      </View>

      {locked && (
        <View className="absolute right-3 top-3 rounded-full bg-white p-1.5">
          <Ionicons name="lock-closed" size={18} color={AppTheme.colors.textMuted} />
        </View>
      )}
    </View>
  );
}

export function FoundationLesson() {
  return (
    <View className="px-5 mt-10">
      <Text className="mb-5 text-xl font-extrabold text-[#13213A]">
        Foundation Tracks
      </Text>
      <View className="flex-row flex-wrap justify-between">
      {lessons.map((lesson, index) => (
        <LessonCard key={index} {...lesson} />
      ))}
      </View>
    </View>
  );
}
