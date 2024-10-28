import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  // shadow settings
  const shadowOffset = 10;
  const lightShadow = useThemeColor({}, "lightShadow");
  const darkShadow = useThemeColor({}, "darkShadow");

  const border = useThemeColor({}, "border");

  // animation
  const aspectRatio = useSharedValue(2);
  const handlePress = () => {
    aspectRatio.value = withSpring(3 - aspectRatio.value, {damping: 11});
  };

  const content = children ? (
    children
  ) : (
    <ThemedText type="subtitle">{title}</ThemedText>
  );

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          aspectRatio: aspectRatio
        }}
      >
        <ThemedView
          style={[
            styles.shadow,
            {
              shadowColor: darkShadow,
              shadowOffset: { height: shadowOffset, width: shadowOffset },
              flex: 1,
              borderWidth: Platform.OS === "android" ? 1 : 0,
              borderColor: border,
              overflow: "hidden",
            },
          ]}
        >
          {Platform.OS === "ios" ? (
            <ThemedView
              style={[
                styles.shadow,
                {
                  shadowColor: lightShadow,
                  shadowOffset: { height: -shadowOffset, width: -shadowOffset },
                  width: "100%",
                  height: "100%",
                },
              ]}
            >
              {content}
            </ThemedView>
          ) : (
            <>{content}</>
          )}
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 40,
    // shadowRadius: 12,
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
});
