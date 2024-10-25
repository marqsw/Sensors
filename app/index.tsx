import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import SensorCard from "@/components/SensorCard";
import { ScrollView } from "react-native";

const gapSize = 40;

export default function Home() {
  return (
    <ThemedView>
      <SafeAreaView>
        <ScrollView>
          <ThemedView
            style={{
              margin: gapSize,
              gap: gapSize,
            }}
          >
            <SensorCard />
            <SensorCard />
            <SensorCard />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
