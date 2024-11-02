import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import CameraView from "@/components/CameraView";
import ControlPanel from "@/components/control-panel/ControlPanel";
import { View } from "react-native";
import { Component, useContext, useState } from "react";
import RecordingProvider from "@/components/context/RecordingProvider";
import SelectedSensorsProvider from "@/components/context/SelectedSensorsProvider";
import SelectionModeProvider from "@/components/context/SelectionModeProvider";
const gapSize = 25;

export default function Index() {
  const headerHeight = useHeaderHeight();

  return (
    <RecordingProvider>
      <SelectionModeProvider>
        <SelectedSensorsProvider>
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
                      alignItems: "center",
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
        </SelectedSensorsProvider>
      </SelectionModeProvider>
    </RecordingProvider>
  );
}
