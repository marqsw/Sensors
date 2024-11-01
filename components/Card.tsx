import { Platform, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Shadow from "./Shadow";
import { useThemeColor } from "@/hooks/useThemeColor";

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

  const border = useThemeColor({}, "border");

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          aspectRatio: aspectRatio,
        }}
      >
        <Shadow
          style={{
            borderRadius: 40,
            borderColor: border,
            borderWidth: Platform.OS === "android" ? 1 : 0,
            flex: 1,

          }}
        >
          {content}
        </Shadow>
      </Animated.View>
    </Pressable>
  );
}
