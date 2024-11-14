import AccelerometerCard from "@/components/card/sensor-cards/AccelerometerCard";
import BarometerCard from "@/components/card/sensor-cards/BarometerCard";
import CameraCard from "@/components/card/sensor-cards/CameraCard";
import GyroscopeCard from "@/components/card/sensor-cards/GyroscopeCard";
import LightsensorCard from "@/components/card/sensor-cards/LightSensorCard";
import MagnetometerCard from "@/components/card/sensor-cards/MagnetometerCard";
import ContextProvider from "@/components/context/ContextProvider";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { ThemedView } from "@/components/ThemedView";
import { useHeaderHeight } from "@react-navigation/elements";
import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const gapSize = 40;

export default function Index() {
  const headerHeight = useHeaderHeight();

  return (
    <ContextProvider>
      <GestureHandlerRootView>
        <ThemedView
          style={[{ paddingTop: headerHeight }, StyleSheet.absoluteFill]}
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
                  <CameraCard />
                  <AccelerometerCard />
                  <GyroscopeCard />
                  <BarometerCard />
                  <MagnetometerCard />
                  {Platform.OS === "android" && <LightsensorCard />}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
          <ControlPanel />
        </ThemedView>
      </GestureHandlerRootView>
    </ContextProvider>
  );
}
