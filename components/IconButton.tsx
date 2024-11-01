import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
type IconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  buttonSize: number;
  enabled?: boolean;
  handleOnPress?: () => void;
};

export default function IconButton({
  iconName,
  buttonSize,
  enabled,
  handleOnPress,
}: IconButtonProps) {
  const iconColor = useThemeColor({}, "text");

  return (
    <Pressable
      onPress={handleOnPress}
      style={{
        alignItems: "center",
      }}
      disabled={!enabled}
    >
      <Ionicons name={iconName} size={buttonSize * 0.45} color={iconColor} />
    </Pressable>
  );
}
