import { RecordingContext } from "@/components/context/recording/RecordingProvider";
import { SelectionModeContext } from "@/components/context/recording/SelectionModeProvider";
import IconButton from "@/components/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Camera, CameraType, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../../ThemedText";
import Card from "../Card";

export default function CameraCard() {
  let cameraRef = useRef<CameraView | null>(null);

  const textColor = useThemeColor({}, "text");

  // permission
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useState<boolean>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  // camera
  const [facing, setFacing] = useState<CameraType>("back");

  const [enabletorch, setEnableTorch] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const recording = useContext(RecordingContext);
  const selectionMode = useContext(SelectionModeContext);

  const [video, setVideo] = useState<{ uri: string } | undefined>(undefined);

  const animatedPadding = useSharedValue(0);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      marginTop: `${animatedPadding.value}%`,
      marginRight: `${animatedPadding.value}%`,
      marginLeft: `${animatedPadding.value}%`,
      marginBottom: 0,
    };
  });

  const animatedFlexValue = useSharedValue(1);

  useEffect(() => {
    animatedPadding.value = withSpring(expanded ? 5 : 0);
    animatedFlexValue.value = withTiming(expanded ? 1 : 0.001);
  }, [expanded]);

  useEffect(() => {
    if (selected) {
      if (recording) {
        cameraRef.current?.recordAsync().then((recordedVideo) => {
          setVideo(recordedVideo);
        });
      } else {
        cameraRef.current?.stopRecording();
      }
    }
  }, [recording]);

  useEffect(() => {
    if (video) {
      MediaLibrary.saveToLibraryAsync(video.uri);
      setVideo(undefined);
    }
  }, [video]);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return (
      <Card
        expanded={expanded}
        setExpanded={setExpanded}
        selected={selected}
        setSelected={setSelected}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ThemedText>We need your permission to show the camera</ThemedText>
        </View>
      </Card>
    );
  }

  return (
    <Card
      expanded={expanded}
      setExpanded={setExpanded}
      selected={selected}
      setSelected={setSelected}
    >
      <View style={[StyleSheet.absoluteFill, { flex: 1 }]}>
        <Animated.View
          style={[
            animatedViewStyle,
            { overflow: "hidden", borderRadius: 35, flex: 2 },
          ]}
        >
          <CameraView
            mode="video"
            ref={cameraRef}
            videoQuality="2160p"
            facing={facing}
            style={StyleSheet.absoluteFill}
            enableTorch={enabletorch}
          />
        </Animated.View>
        <Animated.View
          style={{
            flex: animatedFlexValue,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton
            iconName={enabletorch ? "flash" : "flash-outline"}
            iconColor={textColor}
            buttonSize={70}
            enabled={!selectionMode}
            handleOnPress={() => setEnableTorch((prev) => !prev)}
          />
          <IconButton
            iconName={"camera-reverse"}
            iconColor={textColor}
            buttonSize={70}
            enabled={!(selectionMode || recording)}
            handleOnPress={() =>
              setFacing((current) => (current === "back" ? "front" : "back"))
            }
          />
        </Animated.View>
      </View>
    </Card>
  );
}
