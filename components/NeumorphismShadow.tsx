import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Platform, StyleSheet } from "react-native";

type NeumorphismShadowProps = {
  children: React.ReactNode;
};

export default function NeumorphismShadow({
  children,
  ...otherProps
}: NeumorphismShadowProps) {
  const shadowOffset = 20;
  const lightShadow =
    Platform.OS === "ios" ? useThemeColor({}, "lightShadow") : "#fff";
  const darkShadow =
    Platform.OS === "ios" ? useThemeColor({}, "darkShadow") : "#000";

  return (
    <ThemedView
      style={[
        styles.shadow,
        otherProps,
        {
          shadowColor: darkShadow,
          shadowOffset: { height: shadowOffset, width: shadowOffset },
          aspectRatio: 1,
        },
      ]}
    >
      {Platform.OS === "ios" ? (
        <ThemedView
          style={[
            styles.shadow,
            {
              shadowColor: lightShadow,
              shadowOffset: { height: -shadowOffset, width: -shadowOffset },
              width: "100%",
              height: "100%",
            },
          ]}
        >
          {children}
        </ThemedView>
      ) : (
        children
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 40,
    shadowRadius: 20,
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 24,
  },
});
