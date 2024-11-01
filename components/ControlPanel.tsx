import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import RecordButton from "./RecordButton";

import { BlurView } from "@react-native-community/blur";
import IconButton from "./IconButton";

export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const buttonSize = 65;
  const [recording, setRecording] = useState(false);
  const [expanded, setExpanded] = useState(true);

  console.log(expanded);

  return (
    <>
      {/* <TouchableOpacity
        style={{ flex: 1, height: "100%", width: "100%" }}
        onPress={() => setExpanded((prev) => !prev)}
      /> */}
      <View
        style={[
          {
            position: "absolute",
            justifyContent: "flex-end",
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            borderColor: borderColor,
            borderTopWidth: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingVertical: 30,
            opacity: expanded ? 1 : 0,
          }}
        >
          <BlurView
            style={[{ position: "absolute" }, StyleSheet.absoluteFill]}
            overlayColor="#0000"
            />

          <IconButton buttonSize={buttonSize} iconName="albums-outline" />
          <RecordButton
            buttonSize={buttonSize}
            recording={recording}
            toggleRecording={() => setRecording((prevState) => !prevState)}
          />
          <IconButton buttonSize={buttonSize} iconName="close-outline" />
        </View>
      </View>
    </>
  );
}
