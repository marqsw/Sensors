import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
type IconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  buttonSize: number;
  enabled?: boolean;
  handleOnPress?: () => void;
};

export default function IconButton({
  iconName,
  iconColor,
  buttonSize,
  enabled = true,
  handleOnPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={handleOnPress}
      style={{
        alignItems: "center",
        opacity: enabled ? 1 : 0.5,
      }}
      disabled={!enabled}
    >
      <Ionicons
        name={iconName}
        size={buttonSize * 0.45}
        color={iconColor || "white"}
      />
    </Pressable>
  );
}
