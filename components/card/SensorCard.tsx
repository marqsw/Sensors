import { View, StyleSheet } from "react-native";
import Card from "./Card";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import LineGraphView from "./LineGraphView";
import { GraphPoint } from "react-native-graph";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  liveData: number[];
  axisName?: string[];
  axisColors?: string[] | null;
  graphData: GraphPoint[][];
  setGraphData: React.Dispatch<React.SetStateAction<GraphPoint[][]>>;
  milliseconds: number;
  setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
};

export default function SensorCard({
  title,
  description,
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
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <Card
      expanded={expanded}
      setExpanded={setExpanded}
      selected={selected}
      setSelected={setSelected}
    >
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
          <ThemedText type="subtitle">{title}</ThemedText>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {liveData.map((data, index) => (
              <ThemedText key={axisName[index]} style={{ color: axisColors[index] }}>
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

      {
        expanded && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ThemedText style={{textAlign: 'left'}}>{description}</ThemedText>
          </View>
      }

      </View>
    </Card>
  );
}
