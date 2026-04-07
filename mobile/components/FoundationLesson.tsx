import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Lesson = {
  title: string;
  progress: string;
  locked?: boolean;
};

const lessons: Lesson[] = [
  { title: "Mindset & Beliefs", progress: "0/24", locked: false },
  { title: "Mindset & Beliefs", progress: "0/24", locked: true },
  { title: "Mindset & Beliefs", progress: "0/24", locked: true },
  { title: "Mindset & Beliefs", progress: "0/24", locked: true },
  { title: "Mindset & Beliefs", progress: "0/24", locked: true },
  { title: "Mindset & Beliefs", progress: "0/24", locked: true },
];

function LessonCard({ title, progress, locked }: Lesson) {
  return (
    <View
      className={`relative mb-5 aspect-square h-40 w-[47%] rounded-4xl bg-zinc-500 ${
        locked ? "pointer-events-none opacity-65" : ""
      }`}
    >
      {/* Content */}
      <View className="absolute bottom-0 w-full justify-center p-3">
        <Text className="text-center text-lg font-medium text-white">
          {progress}
        </Text>
        <Text className="text-center text-lg font-medium text-white">
          {title}
        </Text>
      </View>

      {/* Lock Icon */}
      {locked && (
        <Ionicons
          name="lock-closed"
          size={18}
          color="#374151" // fixed color
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "white",
            padding: 6,
            borderRadius: 999,
          }}
        />
      )}
    </View>
  );
}

export function FoundationLesson() {
  return (
    <View className="flex-row flex-wrap justify-between p-5">
      {lessons.map((lesson, index) => (
        <LessonCard key={index} {...lesson} />
      ))}
    </View>
  );
}
