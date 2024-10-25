import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export default function SensorCard({ ...otherProps }) {
  const shadowOffset = 20;
  const lightShadow = useThemeColor({}, "lightShadow");
  const darkShadow = useThemeColor({}, "darkShadow");

  return (
    <ThemedView
      style={[
        styles.cardBackground,
        otherProps,
        {
          shadowColor: darkShadow,
          shadowOffset: { height: shadowOffset, width: shadowOffset },
          aspectRatio: 1,
        },
      ]}
    >
      <ThemedView
        style={[
          styles.cardBackground,
          {
            shadowColor: lightShadow,
            shadowOffset: { height: -shadowOffset, width: -shadowOffset },
            flex: 1,
            width: '100%',
            height: '100%'
          },
        ]}
      >
        <ThemedText>SensorCard</ThemedText>
      </ThemedView>
    </ThemedView>
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
