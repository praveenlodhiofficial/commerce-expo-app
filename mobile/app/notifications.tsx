import React, { useRef, useState } from "react";
import { View, Text, FlatList, Animated } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Ionicons } from "@expo/vector-icons";

import { AppTheme } from "@/constants/theme";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Feature Released",
    description: "Check out the new productivity dashboard.",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    title: "Challenge Completed",
    description: "Your tribe finished the 7-day consistency challenge.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Weekly Progress",
    description: "You reached 82% of your weekly learning goal.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    title: "New Tribe Post",
    description: "A new resource was shared in your tribe.",
    time: "3 days ago",
    read: false,
  },
    {
    id: "5",
    title: "Welcome to Leventa",
    description: "Your account has been created successfully.",
    time: "3 days ago",
    read: false,
  },
];

// ── per-item component so each has its own Animated.Value ──────────────────
function NotificationItem({
  item,
  onDelete,
}: {
  item: Notification;
  onDelete: (id: string) => void;
}) {
  const opacity = useRef(new Animated.Value(1)).current;

  const renderSwipeAction = () => (
    <View
      className="mb-3 flex-1 items-center justify-center rounded-[22px]"
      style={{ backgroundColor: AppTheme.colors.danger }}
    >
      <Ionicons name="trash" size={20} color="white" />
    </View>
  );

  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item.id);
    });
  };

  return (
    <ReanimatedSwipeable
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={80}
      rightThreshold={80}
      renderLeftActions={renderSwipeAction}
      renderRightActions={renderSwipeAction}
      onSwipeableOpen={handleDelete}
    >
      <Animated.View style={{ opacity }}>
        <View
          className="mb-3 rounded-[22px] border p-4"
          style={{
            borderColor: AppTheme.colors.border,
            backgroundColor: AppTheme.colors.surface,
          }}
        >
          <View className={`flex-row items-center justify-between ${item.read ? "opacity-40" : "opacity-100"}`} >
            <Text
              style={{
                fontSize: AppTheme.typography.body,
                fontWeight: "700",
                color: AppTheme.colors.text,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: AppTheme.typography.caption,
                color: AppTheme.colors.textMuted,
              }}
            >
              {item.time}
            </Text>
          </View>

          <Text
            style={{
              marginTop: 6,
              fontSize: AppTheme.typography.bodySmall,
              lineHeight: 21,
              color: AppTheme.colors.textMuted,
              opacity: item.read ? 0.6 : 1,
            }}
          >
            {item.description}
          </Text>
        </View>
      </Animated.View>
    </ReanimatedSwipeable>
  );
}

// ── screen ──────────────────────────────────────────────────────────────────
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View
      className="flex-1 px-5 pt-6"
      style={{ backgroundColor: AppTheme.colors.background }}
    >
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <NotificationItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Ionicons
              name="notifications-off"
              size={40}
              color={AppTheme.colors.textMuted}
            />
            <Text
              style={{
                marginTop: 12,
                fontSize: AppTheme.typography.body,
                color: AppTheme.colors.textMuted,
              }}
            >
              No notifications
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}