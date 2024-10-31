import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";
import { useState } from "react";
import RecordButton from "./RecordButton";

export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const expanded = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: borderColor,
      }}
    >
      <RecordButton />
    </View>
  );
}
