import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Shadow from "./Shadow";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext, useEffect, useState } from "react";
import { SelectionModeContext } from "./SelectionModeContext";
import { RecordingModeContext } from "./RecordingModeContext";
import { DarkTheme } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  const selectionMode = useContext(SelectionModeContext);
  const recordingMode = useContext(RecordingModeContext);
  const aspectRatio = useSharedValue(2);

  const [selected, setSelected] = useState(false);

  const lightMode = useColorScheme() === "light";

  const handlePress = () => {
    if (selectionMode) {
      setSelected((prev) => !prev);
    } else {
      aspectRatio.value = withSpring(3 - aspectRatio.value, {
        damping: 11,
        mass: 0.8,
      });
    }
  };

  const content = children ? (
    children
  ) : (
    <ThemedText type="subtitle">{title}</ThemedText>
  );

  const borderColor = useThemeColor({}, "border");

  const animatedBorderWidth = useSharedValue(1);

  useEffect(() => {
    animatedBorderWidth.value =
      selected && recordingMode
        ? withRepeat(withTiming(0, { duration: 1200 }), -1, true)
        : selected
        ? 2
        : Platform.OS == "android"
        ? !lightMode
          ? 1
          : 0
        : 0;
  }, [selected, recordingMode]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          aspectRatio: aspectRatio,
          borderWidth: animatedBorderWidth,
          borderRadius: 40,
          borderColor:
            recordingMode && selected
              ? "red"
              : selected
              ? "green"
              : borderColor,
        }}
      >
        <Shadow
          style={{
            borderRadius: 40,
            borderColor: borderColor,
            flex: 1,
          }}
        >
          {content}
        </Shadow>
      </Animated.View>
    </Pressable>
  );
}
