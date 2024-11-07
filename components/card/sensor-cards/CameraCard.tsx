import { StyleSheet, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { ThemedText } from "../../ThemedText";
import Card from "../Card";

export default function CameraCard() {
  const { hasPermission, requestPermission } = useCameraPermission();
  if (!hasPermission) requestPermission();

  const device = useCameraDevice("back");

  return (
    <Card>
      {device == null || !hasPermission ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ThemedText>Please enable camera in Settings</ThemedText>
        </View>
      ) : (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </Card>
  );
}
