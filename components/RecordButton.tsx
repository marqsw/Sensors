import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type RecordButtonProps = {
  buttonSize: number;
  recording: boolean;
  toggleRecording: () => void;
};

export default function RecordButton({
  buttonSize,
  recording,
  toggleRecording,
}: RecordButtonProps) {
  const size = useSharedValue(buttonSize * 0.8);
  const borderRadius = useSharedValue(size.value / 2);
  const borderColor = useThemeColor({}, "text");

  const handleOnPressIn = () => {
    size.value = withSpring(size.value * 0.8);
  };

  const handleOnPressOut = () => {
    toggleRecording();

    if (recording) {
      borderRadius.value = withTiming(buttonSize * 0.4 * 0.2, {
        duration: 200,
      });
      size.value = withSpring(buttonSize * 0.4, { mass: 0.6 });
    } else {
      borderRadius.value = 25;
      size.value = withSpring(buttonSize * 0.8, { mass: 0.6 });
    }
  };

  return (
    <Pressable onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <View
        style={[
          {
            borderColor: borderColor,
            borderWidth: 3,
            height: buttonSize,
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
