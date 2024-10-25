import { SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { HeaderTitle, useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";

const gapSize = 25;

export default function Home() {
  const headerHeight = useHeaderHeight();

    // const device = useCameraDevice('back')
    // const { hasPermission } = useCameraPermission()


  return (
    <ThemedView
      style={{
        paddingTop: headerHeight,
      }}
    >
      <SafeAreaView>
        <ScrollView
          style={{
            minHeight: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView
            style={{
              margin: gapSize,
              gap: gapSize,
              flexDirection: "column",
            }}
          >
            {cards.map((card) => {
              return <Card key={card.title} {...card} />;
            })}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const cards = [
  { title: "Camera", shape: "rectangle" },
  { title: "Accelerometer" },
  { title: "Gyroscope" },
  { title: "Magnetometer" },
  { title: "Barometer" },
];
