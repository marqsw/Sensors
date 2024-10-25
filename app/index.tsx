import { SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import SensorCard from "@/components/SensorCard";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const gapSize = 40;

export default function Home() {
  const headerHeight = useHeaderHeight();

  return (
    <ThemedView
      style={{
        paddingTop: headerHeight,
      }}
    >
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
