import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type RecordButtonProps = {
  buttonSize: number;
  recording: boolean;
  enabled?: boolean;
  toggleRecording: () => void;
};

export default function RecordButton({
  buttonSize,
  recording,
  enabled = true,
  toggleRecording,
}: RecordButtonProps) {
  const size = useSharedValue(recording ? buttonSize * 0.4 : buttonSize * 0.8);
  const borderRadius = useSharedValue(
    recording ? buttonSize * 0.4 * 0.2 : size.value / 2
  );

  const handleOnPressIn = () => {
    size.value = withSpring(size.value * 0.8);
  };

  const handleOnPressOut = () => {
    if (!recording) {
      borderRadius.value = withTiming(buttonSize * 0.4 * 0.2, {
        duration: 200,
      });
      size.value = withSpring(buttonSize * 0.4, { mass: 0.6 });
    } else {
      borderRadius.value = buttonSize / 2;
      size.value = withSpring(buttonSize * 0.8, { mass: 0.6 });
    }

    toggleRecording();
  };

  return (
    <Pressable
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      disabled={!enabled}
    >
      <View
        style={[
          {
            borderColor: "white",
            borderWidth: 3,
            height: buttonSize,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 99999,
            aspectRatio: 1,
            opacity: enabled ? 1 : 0.5,
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
