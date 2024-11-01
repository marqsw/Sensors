import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type RecordButtonProps = {
  recording: boolean;
  toggleRecording: () => void;
};

export default function RecordButton({
  recording,
  toggleRecording,
}: RecordButtonProps) {
  const size = useSharedValue(50);
  const borderRadius = useSharedValue(size.value / 2);
  const borderColor = useThemeColor({}, "text");

  const handleOnPressIn = () => {
    size.value = withSpring(size.value * 0.8);
  };

  const handleOnPressOut = () => {
    toggleRecording();

    if (recording) {
      borderRadius.value = withTiming(5);
      size.value = withSpring(25);
    } else {
      borderRadius.value = 25;
      size.value = withSpring(50);
    }
  };

  return (
    <Pressable onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <View
        style={[
          {
            borderColor: borderColor,
            borderWidth: 3,
            height: 65,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 99999,
            aspectRatio: 1,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              height: size,
              backgroundColor: "red",
              borderRadius: borderRadius,
              aspectRatio: 1,
            },
          ]}
        />
      </View>
    </Pressable>
  );
}
