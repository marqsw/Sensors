import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import CameraView from "@/components/CameraView";
import ControlPanel from "@/components/ControlPanel";
import { View } from "react-native";
import { SelectionModeContext } from "@/components/SelectionModeContext";
import { Component, useContext, useState } from "react";
import { RecordingModeContext } from "@/components/RecordingModeContext";
const gapSize = 25;

export default function Index() {
  const headerHeight = useHeaderHeight();
  const [selectionMode, setSelectionMode] = useState(false)
  const [recordingMode, setRecordingMode] = useState(false)

  return (
    <RecordingModeContext.Provider value={recordingMode}>
    <SelectionModeContext.Provider value={selectionMode}>
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
                      paddingBottom: "20%",
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
              <ControlPanel setSelectionMode={setSelectionMode} setRecordingMode={setRecordingMode}/>
            </SafeAreaView>
          </ThemedView>
        </SelectionModeContext.Provider>
      </RecordingModeContext.Provider>
  );
}
