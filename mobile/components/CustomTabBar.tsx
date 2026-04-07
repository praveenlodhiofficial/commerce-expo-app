import { useRef } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import Svg, { Rect, Circle, Path, Line, Polyline } from "react-native-svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

const TAB_CONFIG = {
  skills:     { label: "Skills",     activeColor: "#f97316" },
  tribe:      { label: "Tribe",      activeColor: "#f97316" },
  challenges: { label: "Challenges", activeColor: "#f97316" },
  wall:       { label: "Wall",       activeColor: "#f97316" },
  profile:    { label: "Profile",    activeColor: "#f97316" },
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
    <View style={{ position: "absolute", bottom: 16, left: 12, right: 12 }}>
      <View style={{ borderRadius: 28, overflow: "hidden" }}>
        <LinearGradient
          colors={["rgba(15,12,41,0.6)", "rgba(26,16,64,0.55)"]}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderRadius: 28,
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.18)",
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

            return (
              <Animated.View key={route.key} style={{ transform: [{ scale: scaleAnims[index] }] }}>
                <Pressable onPress={() => handlePress(route, index, isFocused)} style={{ alignItems: "center", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: isFocused ? "rgba(249,115,22,0.15)" : "transparent", borderWidth: isFocused ? 0.5 : 0, borderColor: "rgba(249,115,22,0.35)", minWidth: 52 }}>
                  {isFocused && (
                    <View style={{ position: "absolute", top: -1, left: "50%", marginLeft: -2, width: 4, height: 4, borderRadius: 2, backgroundColor: "#f97316", shadowColor: "#f97316", shadowOpacity: 0.9, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } }} />
                  )}
                  <TabIcon name={route.name} color={isFocused ? "#f97316" : "rgba(255,255,255,0.4)"} />
                  <Text style={{ fontSize: 10, marginTop: 4, fontWeight: isFocused ? "600" : "500", color: isFocused ? "#f97316" : "rgba(255,255,255,0.35)", letterSpacing: 0.3 }}>
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