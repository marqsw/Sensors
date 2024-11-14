import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
type IconButtonProps = {
  title?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  buttonSize: number;
  enabled?: boolean;
  handleOnPress?: () => void;
};

export default function IconButton({
  title,
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
        justifyContent: "center",
        opacity: enabled ? 1 : 0.5,
        flex: 1
      }}
      disabled={!enabled}
    >
      <Ionicons
        name={iconName}
        size={buttonSize * 0.45}
        color={iconColor || "white"}
      />
      {title && <ThemedText style={{ color: iconColor || "white"}}>{title}</ThemedText>}
    </Pressable>
  );
}
