import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "../ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Shadow from "../Shadow";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactElement, useContext, useEffect, useState } from "react";
import { SelectionModeContext } from "../context/recording/SelectionModeProvider";
import { RecordingContext } from "../context/recording/RecordingProvider";
import {
  SelectedSensorsContext,
  SetSelectedSensorsContext,
} from "../context/recording/SelectedSensorsProvider";


type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  const selectionMode = useContext(SelectionModeContext);
  const recording = useContext(RecordingContext);
  const aspectRatio = useSharedValue(2);

  const selectedSensors = useContext(SelectedSensorsContext);
  const setSelectedSensors = useContext(SetSelectedSensorsContext);


  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(false);

  const lightMode = useColorScheme() === "light";

  const handlePress = () => {
    if (selectionMode) {
      setSelected((prev) => !prev);
    } else {

      setExpanded(prev => !prev)
      aspectRatio.value = withSpring(expanded ? 2 : 1, {
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
  const animatedWidth = useSharedValue(100);

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  const handleOnPressIn = () => {
    animatedWidth.value = withSpring(95);
  };

  const handleOnPressOut = () => {
    animatedWidth.value = withSpring(100, { damping: 15 });
  };

  useEffect(() => {
    animatedBorderWidth.value =
      selected && recording
        ? withRepeat(withTiming(0, { duration: 700 }), -1, true)
        : selected
        ? 2
        : Platform.OS == "android"
        ? !lightMode
          ? 1
          : 0
        : 0;
  }, [selected, recording]);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
    >
      <Animated.View
        style={[
          animatedWidthStyle,
          {
            aspectRatio: aspectRatio,
            borderWidth: animatedBorderWidth,
            borderRadius: 40,
            borderColor:
              recording && selected ? "red" : selected ? "green" : borderColor,
          },
        ]}
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
