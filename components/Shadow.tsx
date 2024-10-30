import { ReactNode } from "react";
import { ThemedView } from "./ThemedView";
import { Platform, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type ShadowProps = {
  children: ReactNode;
};

export default function Shadow({ children }: ShadowProps) {
  const shadowOffset = 10;
  const lightShadow = useThemeColor({}, "lightShadow");
  const darkShadow =
    Platform.OS === "ios" ? useThemeColor({}, "darkShadow") : "#000";

  const border = useThemeColor({}, "border");

  return (
    <ThemedView
      style={[
        styles.shadow,
        {
          shadowColor: darkShadow,
          shadowOffset: { height: shadowOffset, width: shadowOffset },
          flex: 1,
          borderWidth: Platform.OS === "android" ? 1 : 0,
          borderColor: border,
          overflow: "hidden",
        },
      ]}
    >
      {Platform.OS === "ios" ? (
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
      ) : (
        <>{children}</>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 40,
    shadowRadius: 12,
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
});
