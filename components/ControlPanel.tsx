import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import RecordButton from "./RecordButton";
import { BlurView } from "@react-native-community/blur";
import IconButton from "./IconButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function ControlPanel() {
  const borderColor = useThemeColor({}, "border");
  const buttonSize = 65;
  const [recording, setRecording] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const contentOpacity = useSharedValue(1);
  const height = useSharedValue(15);

  const controlPanelStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor,
      borderTopWidth: 1,
      height: `${height.value}%`,
    };
  });

  useEffect(() => {
    contentOpacity.value = withTiming(expanded ? 1 : 0);
    height.value = withSpring(expanded ? 20 : 5);
  }, [expanded]);

  return (
    <>
      <View
        style={[
          {
            position: "absolute",
            justifyContent: "flex-end",
          },
          StyleSheet.absoluteFill,
        ]}
      >
        {expanded && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setExpanded(false)}
          />
        )}

        <Animated.View style={controlPanelStyle}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setExpanded(true)}
          >
            <BlurView
              style={[{ position: "absolute" }, StyleSheet.absoluteFill]}
              overlayColor="#0000"
            />
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
              <IconButton buttonSize={buttonSize} iconName="albums-outline" />
              <RecordButton
                buttonSize={buttonSize}
                recording={recording}
                enabled={expanded}
                toggleRecording={() => setRecording((prevState) => !prevState)}
              />
              <IconButton buttonSize={buttonSize} iconName="close-outline" />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}
