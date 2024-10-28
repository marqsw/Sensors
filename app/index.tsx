import { SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Card from "@/components/Card";
import CameraView from "@/components/CameraView";

const gapSize = 25;

export default function Index() {
  const headerHeight = useHeaderHeight();

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
              return <Card key={card.title} title={card.title}>{card.children}</Card>;
            })}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const cards = [
  { title: "Camera", children: <CameraView /> },
  { title: "Accelerometer" },
  { title: "Gyroscope" },
  { title: "Magnetometer" },
  { title: "Barometer" },
];
