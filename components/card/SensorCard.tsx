import { View, StyleSheet } from "react-native";
import Card from "./Card";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import LineGraphView from "./LineGraphView";
import { GraphPoint } from "react-native-graph";

type Props = {
  liveData: number[];
  axisName?: string[];
  axisColors?: string[] | null;
  graphData: GraphPoint[][];
  setGraphData: React.Dispatch<React.SetStateAction<GraphPoint[][]>>;
  milliseconds: number;
  setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
};

export default function SensorCard({
  liveData,
  axisName = ["x", "y", "z"],
  axisColors = null,
  graphData,
  setGraphData,
  milliseconds,
  setMilliseconds,
}: Props) {
  if (axisColors === null) {
    axisColors = [
      useThemeColor({}, "xAxis"),
      useThemeColor({}, "yAxis"),
      useThemeColor({}, "zAxis"),
    ];
  }

  return (
    <Card>
      <View
        style={[
          {
            padding: "5%",
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <View
          style={{
            flex: 1,
            gap: 10,
            alignItems: "center",
          }}
        >
          <ThemedText type="subtitle">Accelerometer</ThemedText>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {liveData.map((data, index) => (
              <ThemedText style={{ color: axisColors[index] }}>
                {axisName[index]}: {data.toFixed(3)}
              </ThemedText>
            ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignSelf: "stretch",
          }}
        >
          <LineGraphView
            liveData={liveData}
            graphData={graphData}
            setGraphData={setGraphData}
            milliseconds={milliseconds}
            setMilliseconds={setMilliseconds}
          />
        </View>
      </View>
    </Card>
  );
}
