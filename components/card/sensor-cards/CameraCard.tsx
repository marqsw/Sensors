import { Button, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../../ThemedText";
import Card from "../Card";
import { useContext, useEffect, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "@/components/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SelectionModeContext } from "@/components/context/recording/SelectionModeProvider";

export default function CameraCard() {
  const textColor = useThemeColor({}, "text");

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [enabletorch, setEnableTorch] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const selectionMode = useContext(SelectionModeContext);

  const animatedPadding = useSharedValue(0);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      margin: `${animatedPadding.value}%`,
    };
  });

  useEffect(() => {
    animatedPadding.value = withSpring(expanded ? 5 : 0);
  }, [expanded]);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <Card
        expanded={expanded}
        setExpanded={setExpanded}
        selected={selected}
        setSelected={setSelected}
      />
    );
  }

  if (!permission.granted) {
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
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    </Card>;
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
            { overflow: "hidden", borderRadius: 35, flex: 3 },
          ]}
        >
          <CameraView facing={facing} style={StyleSheet.absoluteFill} />
        </Animated.View>
        {expanded && (
          <View
            style={{
              flex: 1,
              margin: "5%",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <IconButton
              iconName={enabletorch ? "flash" : "flash-outline"}
              iconColor={textColor}
              buttonSize={80}
              enabled={!selectionMode}
              handleOnPress={() => setEnableTorch((prev) => !prev)}
            />
            <IconButton
              iconName={"camera-reverse"}
              iconColor={textColor}
              buttonSize={80}
              enabled={!selectionMode}
              handleOnPress={() =>
                setFacing((current) => (current === "back" ? "front" : "back"))
              }
            />
          </View>
        )}
      </View>
    </Card>
  );
}
