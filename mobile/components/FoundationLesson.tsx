import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { Ionicons } from "@expo/vector-icons";

import { AppTheme } from "@/constants/theme";

type Lesson = {
  title: string;
  progress: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  locked?: boolean;
};

const lessons: Lesson[] = [
  {
    title: "Mindset & Beliefs",
    progress: "20/24",
    icon: "bulb-outline",
    locked: false,
  },
  {
    title: "Discipline & Habits",
    progress: "0/24",
    icon: "checkmark-done-outline",
    locked: true,
  },
  {
    title: "Communication",
    progress: "0/24",
    icon: "chatbubble-ellipses-outline",
    locked: true,
  },
  {
    title: "Emotional Strength",
    progress: "0/24",
    icon: "heart-outline",
    locked: true,
  },
  {
    title: "Confidence",
    progress: "0/24",
    icon: "rocket-outline",
    locked: true,
  },
  {
    title: "Momentum",
    progress: "0/24",
    icon: "flash-outline",
    locked: true,
  },
];

const SIZE = 32;
const STROKE_WIDTH = 3;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// 60% progress
const progress = lessons[0].progress;
const [done, total] = progress.split("/").map(Number);
const progressValue = done / total;
const strokeDashoffset = CIRCUMFERENCE * (1 - progressValue);

function LessonCard({ title, progress, icon, locked }: Lesson) {
  return (
    <View
      className={`relative mb-4 aspect-square h-44 w-[47.5%] overflow-hidden rounded-[28px] ${
        locked ? "pointer-events-none" : ""
      } ${locked ? "bg-zinc-400" : "bg-zinc-700"}`}
    >
      <View className="absolute top-0 w-full" />
      <View className="absolute left-3 top-3 rounded-full bg-white/90 p-1.5">
        <Ionicons
          name={icon}
          size={16}
          color={locked ? AppTheme.colors.textMuted : AppTheme.colors.primary}
        />
      </View>
      <View className="absolute bottom-0 w-full justify-center p-4">
        <Text className="text-center text-xs font-semibold text-white/80">
          {progress}
        </Text>
        <Text className="mt-1 text-center text-sm font-semibold text-white">
          {title}
        </Text>
      </View>

      {!locked && (
        <View className="absolute top-3 right-3">
          <View style={{ width: SIZE, height: SIZE }}>
            {/* Progress Ring */}
            <Svg width={SIZE} height={SIZE}>
              {/* Background Circle */}
              <Circle
                stroke="#E5E7EB" // light gray
                fill="none"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
              />

              {/* Progress Circle */}
              <Circle
                stroke="#F97316"
                fill="none"
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${SIZE / 2}, ${SIZE / 2}`}
              />
            </Svg>

            {/* Center Content */}
            <View
              className="absolute items-center justify-center rounded-full bg-white"
              style={{
                width: SIZE - 8,
                height: SIZE - 8,
                top: 4,
                left: 4,
              }}
            >
              <Text className="text-xs font-bold text-[#F97316]">{done}</Text>
            </View>
          </View>
        </View>
      )}

      {locked && (
        <View className="absolute top-3 right-3 rounded-full bg-white p-1.5">
          <Ionicons
            name="lock-closed"
            size={18}
            color={AppTheme.colors.textMuted}
          />
        </View>
      )}
    </View>
  );
}

export function FoundationLesson() {
  return (
    <View className="px-5">
      <View className="mb-5 flex-row items-center justify-between">
        <Text
          className="text-xl font-extrabold"
          style={{ color: AppTheme.colors.text }}
        >
          Foundation Tracks
        </Text>
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: "rgba(249,115,22,0.12)" }}
        >
          <Text className="text-xs font-bold" style={{ color: "#F97316" }}>
            1/6 unlocked
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} {...lesson} />
        ))}
      </View>
    </View>
  );
}
