import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";
import { useState } from "react";
import RecordButton from "./RecordButton";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./IconButton";

export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const buttonSize = 65;
  const [recording, setRecording] = useState(false);

  return (
    <View 
      style={{
        flex: 1,
        flexDirection: "row",
        borderColor: borderColor,
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton
        buttonSize={buttonSize}
        iconName="albums-outline"
      />
      <RecordButton
        buttonSize={buttonSize}
        recording={recording}
        toggleRecording={() => setRecording((prevState) => !prevState)}
      />

      <IconButton
        buttonSize={buttonSize}
        iconName="close-outline"
      />
    </View>
  );
}
