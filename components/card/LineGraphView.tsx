import { useThemeColor } from "@/hooks/useThemeColor";
import { MutableRefObject, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GraphPoint, LineGraph } from "react-native-graph";
import { DataPointNumContext } from "../context/graphs/DataPointNumProvider";
import { UpdateIntervalContext } from "../context/graphs/UpdateIntervalProvider";

type Props = {
  liveData: number[];
  graphData: MutableRefObject<GraphPoint[][]>;
  // setGraphData: React.Dispatch<React.SetStateAction<GraphPoint[][]>>;
  milliseconds: number;
  setMilliseconds: React.Dispatch<React.SetStateAction<number>>;
};

export default function LineGraphView({
  liveData,
  graphData,
  // setGraphData,
  milliseconds,
  setMilliseconds,
}: Props) {
  const textColor = useThemeColor({}, "text");
  const axisColors = [
    useThemeColor({}, "xAxis"),
    useThemeColor({}, "yAxis"),
    useThemeColor({}, "zAxis"),
  ];

  const dataPointNum = useContext(DataPointNumContext);
  const updateInterval = useContext(UpdateIntervalContext);

  // update graph
  useEffect(() => {
    const interval = setInterval(() => {
      const newGraphData = graphData.current.map((axis) => [...axis]);
      const currentMillisecond: Date = new Date(milliseconds);

      liveData.forEach((axisValue, index) => {
        const axisData: GraphPoint[] = newGraphData[index];

        axisData.push({
          value: axisValue,
          date: currentMillisecond,
        });

        while (axisData.length > dataPointNum) {
          axisData.shift();
        }
      });
      graphData.current = newGraphData;

      // setGraphData(newGraphData);
      setMilliseconds((prev) => prev + updateInterval);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [milliseconds]);

  return (
    <>
      {graphData.current.map((axis, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <LineGraph
            points={axis}
            color={axisColors[index]}
            animated={false}
            style={[StyleSheet.absoluteFill]}
          />
        </View>
      ))}
    </>
  );
}
