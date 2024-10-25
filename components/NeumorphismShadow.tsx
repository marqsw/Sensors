import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";

type NeumorphismShadowProps = {
  children: React.ReactNode;
};

export default function NeumorphismShadow({
  children,
  ...otherProps
}: NeumorphismShadowProps) {
  const shadowOffset = 20;
  const lightShadow = useThemeColor({}, "lightShadow");
  const darkShadow = useThemeColor({}, "darkShadow");

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
      <ThemedView
        style={[
          styles.shadow,
          {
            shadowColor: lightShadow,
            shadowOffset: { height: -shadowOffset, width: -shadowOffset },
            flex: 1,
            width: "100%",
            height: "100%",
          },
        ]}
      >
        {children}
      </ThemedView>
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
  },
});
