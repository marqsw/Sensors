import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { ThemedText } from "./ThemedText";
import { GraphPoint, LineGraph } from "react-native-graph";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SensorView() {
  const dataPointNum = 100;
  const updateInterval = 50;
  const [milliseconds, setMilliseconds] = useState(0);
  const textColor = useThemeColor({}, "text");

  Accelerometer.setUpdateInterval(updateInterval);

  // Subscription
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  // ----------------------------------------------

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [graphData, setGraphData] = useState<GraphPoint[][]>([[], [], []]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGraphData = [...graphData];

      [x, y, z].forEach((axisValue, index) => {
        const axisData: GraphPoint[] = newGraphData[index];

        axisData.push({
          value: axisValue,
          date: new Date(milliseconds),
        });

        while (axisData.length > dataPointNum) {
          axisData.shift();
        }
      });

      setGraphData(newGraphData);
      // console.log(graphData.at(-1))
      setMilliseconds(updateInterval);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [milliseconds, graphData]);

  return (
    <View
      style={[
        { alignItems: "center", justifyContent: "center", padding: 20 },
        StyleSheet.absoluteFill,
      ]}
    >
      <ThemedText style={{ flex: 2 }} type="subtitle">
        Accelerometer
      </ThemedText>

      <View style={{ flex: 3, width: "100%" }}>
        <LineGraph
          points={graphData[2]}
          color={textColor}
          animated={false}
          style={StyleSheet.absoluteFill}
        />
        {graphData.map((axis, index) => (
          <View key={index} style={{ flex: 1 }}>
            <LineGraph
              points={axis}
              color={textColor}
              animated={false}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
