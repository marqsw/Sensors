import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  // shadow settings
  const shadowOffset = 10;
  const lightShadow =
    Platform.OS === "ios" ? useThemeColor({}, "lightShadow") : "#fff";
  const darkShadow =
    Platform.OS === "ios" ? useThemeColor({}, "darkShadow") : "#000";

  const border = useThemeColor({}, "border");

  const [expand, setExpand] = useState(false);

  const content = (
    <>
      <ThemedText type="subtitle">{title}</ThemedText>

      {children}
    </>
  );

  return (
    <Pressable onPress={() => setExpand(!expand)}>
      <ThemedView
        style={[
          styles.shadow,
          {
            shadowColor: darkShadow,
            shadowOffset: { height: shadowOffset, width: shadowOffset },
            aspectRatio: expand ? 1 : 2,
            flex: 1,
            borderWidth: Platform.OS === "android" ? 1 : 0,
            borderColor: border,
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
            {content}
          </ThemedView>
        ) : (
          <>{content}</>
        )}
      </ThemedView>
    </Pressable>
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
