import { useThemeColor } from "@/hooks/useThemeColor";
import { useContext, useEffect } from "react";
import { Platform, Pressable, useColorScheme } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { RecordingContext } from "../context/recording/RecordingProvider";
import { SelectionModeContext } from "../context/recording/SelectionModeProvider";
import Shadow from "./Shadow";

type CardProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export default function Card({
  expanded,
  setExpanded,
  selected,
  setSelected,
  children,
}: CardProps) {
  const selectionMode = useContext(SelectionModeContext);
  const recording = useContext(RecordingContext);
  const aspectRatio = useSharedValue(2);

  const lightMode = useColorScheme() === "light";

  const handlePress = () => {
    if (selectionMode) {
      setSelected((prev) => !prev);
    } else {
      setExpanded((prev) => !prev);
      aspectRatio.value = withSpring(expanded ? 2 : 1, {
        damping: 11,
        mass: 0.8,
      });
    }
  };
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
          {children}
        </Shadow>
      </Animated.View>
    </Pressable>
  );
}
