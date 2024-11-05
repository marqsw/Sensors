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

  const backgroundColor = useThemeColor({}, "background")


  const styles = StyleSheet.create({
    shadow: {
      shadowRadius: 15,
      shadowOpacity: 1,
      elevation: 20,
      backgroundColor: backgroundColor,
    },
  });


  return (
    <View
      style={[
        styles.shadow,
        style,
        {
          shadowColor: darkShadow,
          shadowOffset: { height: shadowOffset, width: shadowOffset },
        },
      ]}
    >
      <ThemedView
        style={[
          style,
          styles.shadow,
          StyleSheet.absoluteFill,
          {
            shadowColor: lightShadow,
            shadowOffset: { height: -shadowOffset, width: -shadowOffset },
          },
        ]}
      >
        <View

          style={[{
            overflow: "hidden"
          }, style, StyleSheet.absoluteFill]}>{children}</View>
      </ThemedView>
    </View>
  );
}

