import { useRef } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import Svg, { Rect, Circle, Path } from "react-native-svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

import { AppTheme } from "@/constants/theme";

const TAB_CONFIG = {
  skills:     { label: "Discover", activeColor: AppTheme.colors.primary },
  tribe:      { label: "Tribe", activeColor: AppTheme.colors.primary },
  challenges: { label: "Goals", activeColor: AppTheme.colors.primary },
  wall:       { label: "Wall", activeColor: AppTheme.colors.primary },
  profile:    { label: "Me", activeColor: AppTheme.colors.primary },
};

function TabIcon({ name, size = 22, color }: { name: string; size?: number; color: string }) {
  const s = { stroke: color, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "skills":
      return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect x="3" y="3" width="7" height="7" rx="1" {...s}/><Rect x="14" y="3" width="7" height="7" rx="1" {...s}/><Rect x="3" y="14" width="7" height="7" rx="1" {...s}/><Rect x="14" y="14" width="7" height="7" rx="1" {...s}/></Svg>;
    case "tribe":
      return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...s}/><Circle cx="9" cy="7" r="4" {...s}/><Path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" {...s}/></Svg>;
    case "challenges":
      return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" {...s}/></Svg>;
    case "wall":
      return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M3 11l19-9-9 19-2-8-8-2z" {...s}/></Svg>;
    case "profile":
      return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" {...s}/><Circle cx="12" cy="7" r="4" {...s}/></Svg>;
    default:
      return null;
  }
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;

  const handlePress = (route: any, index: number, isFocused: boolean) => {
    Animated.sequence([
      Animated.spring(scaleAnims[index], { toValue: 0.88, useNativeDriver: true, speed: 50 }),
      Animated.spring(scaleAnims[index], { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 14 }),
    ]).start();

    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-transparent">
      <View className="overflow-hidden rounded-b-4xl">
        <LinearGradient
          colors={["#FFFFFF", "#FFF8FA"]}
          className="flex-row  items-center justify-around rounded-3xl border border-[#F0E6E8]  px-2.5 py-2.5"
          style={{
            shadowColor: "#311a21",
            shadowOpacity: 0.5,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 10,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

            return (
              <Animated.View key={route.key} style={{ transform: [{ scale: scaleAnims[index] }] }}>
                <Pressable className="items-center rounded-full px-3.5 py-1.5" onPress={() => handlePress(route, index, isFocused)}>
                  <TabIcon name={route.name} color={isFocused ? "#F97316" : "#9D8F97"} />
                  <Text className={`mt-1 text-[11px] ${isFocused ? "font-bold text-amber-600" : "font-medium text-[#9D8F97]"}`}>
                    {config?.label ?? route.name}
                  </Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );
}