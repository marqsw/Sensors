import { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { ThemedText } from "./ThemedText";
import { GraphPoint, LineGraph } from "react-native-graph";
import { useThemeColor } from "@/hooks/useThemeColor";
import Card from "./Card/Card";

export default function SensorView() {
  const dataPointNum = 50;
  const updateInterval = 50;
  const milisecond = useRef(0);

  const textColor = useThemeColor({}, "text");

  Accelerometer.setUpdateInterval(updateInterval);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // Graph data
  interface GraphPoints {
    xHist: GraphPoint[];
    yHist: GraphPoint[];
    zHist: GraphPoint[];
  }

  const graphData = useRef<GraphPoints>({
    xHist: [],
    yHist: [],
    zHist: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      graphData.current.xHist = graphData.current.xHist.concat({
        value: x,
        date: new Date(milisecond.current),
      });
      graphData.current.yHist = graphData.current.yHist.concat({
        value: y,
        date: new Date(milisecond.current),
      });
      graphData.current.zHist = graphData.current.zHist.concat({
        value: z,
        date: new Date(milisecond.current),
      });

      [
        graphData.current.xHist,
        graphData.current.yHist,
        graphData.current.zHist,
      ].forEach((hist) => {
        while (hist.length > dataPointNum) {
          hist.shift();
        }
      });

      milisecond.current += updateInterval;
    }, updateInterval);

    return () => clearInterval(interval);
  }, [milisecond.current]);

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
        <View style={{ flex: 1, width: "100%" }}>
          <LineGraph
            points={graphData.current.xHist}
            color={textColor}
            animated={false}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <LineGraph
            points={graphData.current.yHist}
            color={textColor}
            animated={false}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <LineGraph
            points={graphData.current.zHist}
            color={textColor}
            animated={false}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </View>
    </View>
  );
}
