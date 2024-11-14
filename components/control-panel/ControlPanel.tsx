import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "@react-native-community/blur";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { RecordedDataJSONContext } from "../context/recording/RecordedDataJSONContext";
import {
  RecordingContext,
  SetRecordingContext,
} from "../context/recording/RecordingProvider";
import {
  SelectionModeContext,
  SetSelectionModeContext,
} from "../context/recording/SelectionModeProvider";
import IconButton from "../IconButton";
import RecordButton from "./RecordButton";
import Settings from "./Settings";

export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const buttonSize = 65;
  const [expanded, setExpanded] = useState(false);

  const contentOpacity = useSharedValue(1);
  const height = useSharedValue(15);
  const width = useSharedValue(100);

  const [settingsOpened, setSettingsOpened] = useState(false);

  const selectionMode = useContext(SelectionModeContext);
  const setSelectionMode = useContext(SetSelectionModeContext);

  const recording = useContext(RecordingContext);
  const setRecording = useContext(SetRecordingContext);
  const recordedDataJSON = useContext(RecordedDataJSONContext);

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

  async function saveRecordedFile() {
    const fileUri = `${
      FileSystem.documentDirectory?.toString() + Date.now.toString()
    } - SensorData.json`;

    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(recordedDataJSON.current),
      { encoding: FileSystem.EncodingType.UTF8 }
    );

    shareAsync(fileUri);
    recordedDataJSON.current = {};
  }

  useEffect(() => {
    if (!isEmpty(recordedDataJSON.current) && !recording) {
      saveRecordedFile();
    }
  }, [recording]);

  useEffect(() => {
    contentOpacity.value = withTiming(expanded ? 1 : 0);
    height.value = withSpring(expanded ? 20 : 10, { damping: 12, mass: 0.8 });
    width.value = withSpring(expanded ? 90 : 25, { damping: 12, mass: 0.8 });

    !expanded && setSettingsOpened(false);
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
        pointerEvents="box-none"
      >
        {/* Dim Background */}
        <Animated.View
          pointerEvents="none"
          style={[shadowBackgroundStyle, StyleSheet.absoluteFill]}
        />

        {/* Detect out of bound taps */}
        {expanded && (
          <Pressable
            style={[StyleSheet.absoluteFill]}
            onPress={() => setExpanded(false)}
          />
        )}

        {/* Settings */}
        <Settings visible={settingsOpened} />

        {/* Control Panel */}
        <Animated.View style={controlPanelStyle}>
          {/* Blurred background */}
          <BlurView
            style={[{ position: "absolute" }, StyleSheet.absoluteFill]}
            // overlayColor="#0000"
            blurAmount={10}
          />

          {/* Detect tap on Control Panel */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setExpanded(true);
              setSelectionMode(false);
            }}
          >
            {/* Button containers */}
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
              {/* Selection button */}
              <IconButton
                title="Select"
                buttonSize={buttonSize}
                iconName={selectionMode ? "albums" : "albums-outline"}
                enabled={expanded && !recording}
                handleOnPress={() => {
                  !selectionMode && setExpanded(false);
                  setSelectionMode(!selectionMode);
                }}
              />

              {/* Record button */}
              <RecordButton
                buttonSize={buttonSize}
                recording={recording}
                enabled={expanded && !selectionMode}
                toggleRecording={() => {
                  setRecording((prev) => !prev);
                }}
              />

              {/* Options button */}
              <IconButton
                title="Options"
                buttonSize={buttonSize}
                iconName="options-outline"
                enabled={expanded && !recording}
                handleOnPress={() => {
                  setSettingsOpened((prev) => !prev);
                }}
              />
            </Animated.View>

            {/* Icon shown on collapsed */}
            <Animated.View
              style={[controlPanelIconStyle, StyleSheet.absoluteFill]}
              pointerEvents="none"
            >
              <IconButton
                title={selectionMode ? "Done" : undefined}
                iconName={
                  selectionMode
                    ? "checkmark-circle"
                    : recording
                    ? "stop-circle"
                    : "videocam"
                }
                buttonSize={buttonSize}
              ></IconButton>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}

function isEmpty(obj: Object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
