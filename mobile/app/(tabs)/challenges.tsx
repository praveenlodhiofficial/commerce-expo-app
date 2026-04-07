import { Pressable, Text, View } from "react-native";

import { AppTheme } from "@/constants/theme";

export default function ChallengesPage() {
    return (
        <View className="flex-1 px-5 pt-6" style={{ backgroundColor: AppTheme.colors.background }}>
            <View className="rounded-[28px] border p-6" style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}>
                <Text style={{ fontSize: AppTheme.typography.h2, fontWeight: "800", color: AppTheme.colors.text }}>
                    Challenges are coming
                </Text>
                <Text style={{ marginTop: 8, fontSize: AppTheme.typography.body, color: AppTheme.colors.textMuted, lineHeight: 24 }}>
                    Daily and weekly missions will drop here to help you build consistency with your tribe.
                </Text>
                <Pressable className="mt-5 rounded-2xl px-4 py-3 bg-blue-100">
                    <Text className="text-center text-sm font-semibold text-blue-600">
                        Notify me first
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
