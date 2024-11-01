import { ReactNode } from "react";
import { ThemedView } from "./ThemedView";
import { Platform, StyleSheet, View, ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type ShadowProps = ViewProps & {
  children: ReactNode;
};

export default function Shadow({ style, children }: ShadowProps) {
  const shadowOffset = 10;
  const lightShadow = useThemeColor({}, "lightShadow");
  const darkShadow =
    Platform.OS === "ios" ? useThemeColor({}, "darkShadow") : "#000";

  return (
    <View
      style={[
        styles.shadow,
        style,
        {
          shadowColor: darkShadow,
          shadowOffset: { height: shadowOffset, width: shadowOffset },
          overflow: "hidden",
        },
      ]}
    >
      <ThemedView
        style={[
          styles.shadow,
          StyleSheet.absoluteFill,
          {
            shadowColor: lightShadow,
            shadowOffset: { height: -shadowOffset, width: -shadowOffset },
          },
        ]}
      >
        {children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 20,
  },
});
