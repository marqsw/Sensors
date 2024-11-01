import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
type IconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  buttonSize: number;
  handleOnPress?: () => void;
};

export default function IconButton({
  iconName,
  buttonSize,
  handleOnPress,
}: IconButtonProps) {
  const iconColor = useThemeColor({}, "text");

  return (
    <Pressable
      onPress={handleOnPress}
      style={{
        alignItems: "center",
      }}
    >
      <Ionicons name={iconName} size={buttonSize * 0.45} color={iconColor} />
    </Pressable>
  );
}
