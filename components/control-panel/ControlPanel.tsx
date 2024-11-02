import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import RecordButton from "./RecordButton";
import { BlurView } from "@react-native-community/blur";
import IconButton from "./IconButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SelectionModeContext } from "../context/SelectionModeContext";
import { RecordingModeContext } from "../context/RecordingModeContext";

type ControlPanelProps = {
  setSelectionMode: (selectionMode: boolean) => void;
  setRecordingMode: (recordingMode: boolean) => void;
};

export default function ControlPanel({
  setSelectionMode,
  setRecordingMode,
}: ControlPanelProps) {
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const buttonSize = 65;
  const [expanded, setExpanded] = useState(false);

  const contentOpacity = useSharedValue(1);
  const height = useSharedValue(15);
  const width = useSharedValue(100);

  const selectionMode = useContext(SelectionModeContext);
  const recordingMode = useContext(RecordingModeContext);

  const controlPanelStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor,
      borderRadius: 40,
      overflow: "hidden",
      borderWidth: 1,
      height: `${height.value}%`,
      width: `${width.value}%`,
      margin: 15,
    };
  });

  const shadowBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "#000",
      opacity: contentOpacity.value * 0.4,
    };
  });

  const controlPanelIconStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - contentOpacity.value,
      position: "absolute",
      alignContent: "center",
      justifyContent: "center",
      alignSelf: "center",
    };
  });

  useEffect(() => {
    contentOpacity.value = withTiming(expanded ? 1 : 0);
    height.value = withSpring(expanded ? 20 : 10, { damping: 12, mass: 0.8 });
    width.value = withSpring(expanded ? 90 : 20, { damping: 12, mass: 0.8 });
  }, [expanded]);

  return (
    <>
      <View
        style={[
          {
            position: "absolute",
            justifyContent: "flex-end",
            alignContent: "center",
            alignItems: "center",
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[shadowBackgroundStyle, StyleSheet.absoluteFill]}
        ></Animated.View>
        {expanded && (
          <Pressable
            style={[StyleSheet.absoluteFill]}
            onPress={() => setExpanded(false)}
          />
        )}

        <Animated.View style={controlPanelStyle}>
          <BlurView
            style={[{ position: "absolute" }, StyleSheet.absoluteFill]}
            overlayColor="#0000"
            blurAmount={100}
          />

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setExpanded(true);
              setSelectionMode(false);
            }}
          >
            <Animated.View
              style={[
                {
                  opacity: contentOpacity,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                },
                StyleSheet.absoluteFill,
              ]}
            >
              <IconButton
                buttonSize={buttonSize}
                iconName={selectionMode ? "albums" : "albums-outline"}
                enabled={expanded && !recordingMode}
                handleOnPress={() => {
                  !selectionMode && setExpanded(false);
                  setSelectionMode(!selectionMode);
                }}
              />
              <RecordButton
                buttonSize={buttonSize}
                recording={recordingMode}
                enabled={expanded && !selectionMode}
                toggleRecording={() => setRecordingMode(!recordingMode)}
              />
              <IconButton
                buttonSize={buttonSize}
                iconName="close-outline"
                enabled={expanded && !recordingMode}
              />
            </Animated.View>

            <Animated.View
              style={[controlPanelIconStyle, StyleSheet.absoluteFill]}
              pointerEvents="none"
            >
              <IconButton
                iconName={
                  selectionMode
                    ? "checkmark-circle"
                    : recordingMode
                    ? "stop-circle"
                    : "videocam"
                }
                iconColor={textColor}
                buttonSize={buttonSize}
              ></IconButton>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}