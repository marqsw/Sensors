import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import NeumorphismShadow from "./NeumorphismShadow";


export default function SensorCard() {
  return (
    <NeumorphismShadow>
      <ThemedText>SensorCard</ThemedText>
    </NeumorphismShadow>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    borderRadius: 40,
    shadowRadius: 20,
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
