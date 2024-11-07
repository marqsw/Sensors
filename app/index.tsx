import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/card/Card";
import CameraView from "@/components/card/CameraView";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContextProvider from "@/components/context/ContextProvider";
import AccelerometerView from "@/components/card/sensor-cards/AccelerometerCard";
import AccelerometerCard from "@/components/card/sensor-cards/AccelerometerCard";

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
                  <Card children={<CameraView />} />
                  <AccelerometerCard />
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
