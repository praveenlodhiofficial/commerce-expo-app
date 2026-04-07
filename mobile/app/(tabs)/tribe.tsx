import { Pressable, Text, View } from "react-native";

import { AppTheme } from "@/constants/theme";

export default function TribePage() {
    return (
        <View className="flex-1 px-5 pt-6" style={{ backgroundColor: AppTheme.colors.background }}>
            <View className="rounded-[28px] border p-6" style={{ borderColor: AppTheme.colors.border, backgroundColor: AppTheme.colors.surface }}>
                <Text style={{ fontSize: AppTheme.typography.h2, fontWeight: "800", color: AppTheme.colors.text }}>
                    Tribe spaces are on the way
                </Text>
                <Text style={{ marginTop: 8, fontSize: AppTheme.typography.body, color: AppTheme.colors.textMuted, lineHeight: 24 }}>
                    Connect with people who share your path, swap progress updates, and keep each other accountable.
                </Text>
                <Pressable className="mt-5 rounded-2xl px-4 py-3 bg-blue-100">
                    <Text className="text-center text-sm font-semibold text-blue-600">
                        Join early access
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
