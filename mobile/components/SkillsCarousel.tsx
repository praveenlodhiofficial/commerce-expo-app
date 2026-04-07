import React, { useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { View } from "react-native";

import HexagonCard from "@/components/HexagonCard";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = 230;
const SPACING = -15;
const FULL_SIZE = ITEM_WIDTH + SPACING;

const data = [
  {
    id: "1",
    title: "The Foundation",
    uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: "2",
    title: "The Creation",
    uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: "3",
    title: "The Connection",
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: "4",
    title: "The Fuel",
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

export function SkillsCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      snapToInterval={FULL_SIZE}
      snapToAlignment="start"
      decelerationRate="fast"
      bounces={false}
      contentContainerStyle={{
        paddingHorizontal: (width - ITEM_WIDTH) / 2 - SPACING,
        alignItems: "center",
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * FULL_SIZE,
          index * FULL_SIZE,
          (index + 1) * FULL_SIZE,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1, 0.7],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={{
              width: ITEM_WIDTH,
              height: 260,
              marginHorizontal: SPACING / 2,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ scale }],
              opacity,
            }}
          >
            <HexagonCard title={item.title} uri={item.uri} width={ITEM_WIDTH} />
          </Animated.View>
        );
      }}
    />
  );
}
