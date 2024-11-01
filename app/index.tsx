import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import CameraView from "@/components/CameraView";
import ControlPanel from "@/components/ControlPanel";
import { Camera } from "react-native-vision-camera";
import { View } from "react-native";
const gapSize = 25;

export default function Index() {
  const headerHeight = useHeaderHeight();

  return (
    <ThemedView
      style={[
        {
          paddingTop: headerHeight,
        },
        StyleSheet.absoluteFill,
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                margin: gapSize,
                gap: gapSize,
              }}
            >
              <Card children={<CameraView />} />
              <Card title="Accelerometer" />
              <Card title="Gyroscope" />
              <Card title="Magnetometer" />
              <Card title="Barometer" />
            </View>
          </ScrollView>
        </View>
        <ControlPanel />
      </SafeAreaView>
    </ThemedView>
  );
}
