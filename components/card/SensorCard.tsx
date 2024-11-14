import { useThemeColor } from "@/hooks/useThemeColor";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GraphPoint } from "react-native-graph";
import { RecordedDataJSONContext } from "../context/recording/RecordedDataJSONContext";
import { RecordingContext } from "../context/recording/RecordingProvider";
import { ThemedText } from "../ThemedText";
import Card from "./Card";
import LineGraphView from "./LineGraphView";

type Props = {
  title: string;
  description: string;
  liveData: number[];
  axesName?: string[];
  axisColors?: string[] | null;
  graphData: MutableRefObject<GraphPoint[][]>;
  // setGraphData: React.Dispatch<React.SetStateAction<GraphPoint[][]>>;
  milliseconds: number;
  setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
  unit: string;
};

export default function SensorCard({
  title,
  description,
  liveData,
  axesName = ["x", "y", "z"],
  axisColors = null,
  graphData,
  milliseconds,
  setMilliseconds,
  unit,
}: Props) {
  const xAxisColor = useThemeColor({}, "xAxis");
  const yAxisColor = useThemeColor({}, "yAxis");
  const zAxisColor = useThemeColor({}, "zAxis");

  if (axisColors === null) {
    axisColors = [xAxisColor, yAxisColor, zAxisColor];
  }
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const recording = useContext(RecordingContext);
  const recordedDataJSON = useContext(RecordedDataJSONContext);

  useEffect(() => {
    if (selected) {
      if (recording) {
        setMilliseconds(0);
        graphData.current = Array(axesName.length).fill([]);
        // setGraphData(Array(axesName.length).fill([]));
      } else {
        recordedDataJSON.current[title] = {};

        axesName.forEach((axisName, index) => {
          recordedDataJSON.current[title][axisName] = graphData.current[
            index
          ].map((graphPoint) => {
            return {
              time: graphPoint.date.getTime(),
              value: graphPoint.value,
            };
          });
        });
      }
    }
  }, [recording]);

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
              <ThemedText
                key={axesName[index]}
                style={{ color: axisColors[index] }}
              >
                {axesName[index]}: {data.toFixed(3)} {unit}
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
            // setGraphData={setGraphData}
            milliseconds={milliseconds}
            setMilliseconds={setMilliseconds}
          />
        </View>

        {expanded && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ThemedText style={{ textAlign: "left" }}>{description}</ThemedText>
          </View>
        )}
      </View>
    </Card>
  );
}
