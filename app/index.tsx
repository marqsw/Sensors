import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import CameraView from "@/components/CameraView";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { View } from "react-native";
import RecordingProvider from "@/components/context/RecordingProvider";
import SelectedSensorsProvider from "@/components/context/SelectedSensorsProvider";
import SelectionModeProvider from "@/components/context/SelectionModeProvider";
import SensorView from "@/components/SensorView";
import DataPointProvider from "@/components/context/DataPointProvider";
import GraphTestView from "@/components/GraphTestView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContextProvider from "@/components/context/ContextProvider";

const gapSize = 40;

export default function Index() {
  const headerHeight = useHeaderHeight();

  return (
    <ContextProvider>
      <GestureHandlerRootView>
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
              <ScrollView showsVerticalScrollIndicator={true}>
                <View
                  style={{
                    margin: gapSize / 2,
                    gap: gapSize,
                    paddingBottom: "25%",
                    alignItems: "center",
                  }}
                >
                  <Card children={<CameraView />} />
                  <Card children={<SensorView />} />
                  <Card children={<GraphTestView />} />
                  <Card title="Accelerometer" />
                  <Card title="Barometer" />
                  <Card title="DeviceMotion" />
                  <Card title="Gyroscope" />
                  <Card title="Magnetometer" />
                  <Card title="LightSensor" />
                  <Card title="Pedometer" />
                </View>
              </ScrollView>
            </View>
            <ControlPanel />
          </SafeAreaView>
        </ThemedView>
      </GestureHandlerRootView>
    </ContextProvider>
  );
}
