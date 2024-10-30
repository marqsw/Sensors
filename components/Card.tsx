import { Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Shadow from "./Shadow";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  const aspectRatio = useSharedValue(2);
  const handlePress = () => {
    aspectRatio.value = withSpring(3 - aspectRatio.value, {
      damping: 11,
    });
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
          aspectRatio: aspectRatio,
        }}
      >
        <Shadow>{content}</Shadow>
      </Animated.View>
    </Pressable>
  );
}
