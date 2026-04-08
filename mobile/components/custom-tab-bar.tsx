import { useRef } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { AppTheme } from "@/constants/theme";

const TAB_CONFIG = {
  home: { label: "Home", activeColor: AppTheme.colors.primary },
  cart: { label: "Cart", activeColor: AppTheme.colors.primary },
  notification: { label: "Alerts", activeColor: AppTheme.colors.primary },
  profile: { label: "Me", activeColor: AppTheme.colors.primary },
};

function TabIcon({
  name,
  size = 22,
  color,
  focused,
}: {
  name: string;
  size?: number;
  color: string;
  focused?: boolean;
}) {
  let iconName: keyof typeof Ionicons.glyphMap;

  switch (name) {
    case "home":
      iconName = focused ? "home" : "home-outline";
      break;

    case "cart":
      iconName = focused ? "cart" : "cart-outline";
      break;

    case "notification":
      iconName = focused ? "notifications" : "notifications-outline";
      break;

    case "profile":
      iconName = focused ? "person" : "person-outline";
      break;

    default:
      iconName = "ellipse-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  const handlePress = (route: any, index: number, isFocused: boolean) => {
    Animated.sequence([
      Animated.spring(scaleAnims[index], {
        toValue: 0.88,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 14,
      }),
    ]).start();

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-transparent">
      <View className="overflow-hidden rounded-b-4xl">
        <LinearGradient
          colors={["#FFFFFF", "#FFF8FA"]}
          className="flex-row items-center justify-around rounded-3xl border border-[#F0E6E8] px-2.5 py-2.5"
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
            const config =
              TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

            return (
              <Animated.View
                key={route.key}
                style={{ transform: [{ scale: scaleAnims[index] }] }}
              >
                <Pressable
                  className={`items-center rounded-full px-3.5 py-1.5 ${
                    isFocused ? "bg-orange-100" : ""
                  }`}
                  onPress={() => handlePress(route, index, isFocused)}
                >
                  <TabIcon
                    name={route.name}
                    color={isFocused ? "#F97316" : "#9D8F97"}
                    focused={isFocused}
                  />

                  <Text
                    className={`mt-1 text-[11px] ${
                      isFocused
                        ? "font-bold text-amber-600"
                        : "font-medium text-[#9D8F97]"
                    }`}
                  >
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