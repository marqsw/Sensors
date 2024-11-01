import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";
import { useState } from "react";
import RecordButton from "./RecordButton";


export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const [recording, setRecording] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        borderColor: borderColor,
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RecordButton
        recording={recording}
        toggleRecording={() => {
          setRecording((prevState) => !prevState);
          console.log(recording);
        }}
      />
    </View>
  );
}
