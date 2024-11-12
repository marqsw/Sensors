import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContextProvider from "@/components/context/ContextProvider";
import AccelerometerCard from "@/components/card/sensor-cards/AccelerometerCard";
import CameraCard from "@/components/card/sensor-cards/CameraCard";
import GyroscopeCard from "@/components/card/sensor-cards/GyroscopeCard";
import BarometerCard from "@/components/card/sensor-cards/BarometerCard";
import MagnetometerCard from "@/components/card/sensor-cards/MagnetometerCard";
import LightsensorCard from "@/components/card/sensor-cards/LightSensorCard";

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
                  {/* {Platform.OS === "android" && <LightsensorCard />} */}
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
