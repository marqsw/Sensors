import { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { ThemedText } from "./ThemedText";
import { GraphPoint, LineGraph } from "react-native-graph";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SensorView() {
  const dataPointNum = 20;
  const updateInterval = 200;
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


  // let emptyGraphPoints = new Array<GraphPoint[]>()

  // for (let i = 0; i < dataPointNum; i++) {
  //   emptyGraphPoints.concat({value: 0, date: })
  // }


  const graphData = useRef<GraphPoints>({
    xHist: Array(dataPointNum).fill({ value: 0, date: new Date(0) }),
    yHist: Array(dataPointNum).fill({ value: 0, date: new Date(0) }),
    zHist: Array(dataPointNum).fill({ value: 0, date: new Date(0) }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      graphData.current.xHist = graphData.current.xHist
        .slice(-dataPointNum)
        .concat({ value: x, date: new Date(milisecond.current) });
      graphData.current.yHist = graphData.current.yHist
        .slice(-dataPointNum)
        .concat({ value: y, date: new Date(milisecond.current) });
      graphData.current.zHist = graphData.current.zHist
        .slice(-dataPointNum)
        .concat({ value: z, date: new Date(milisecond.current) });

      milisecond.current += updateInterval;
    }, updateInterval);

    return () => clearInterval(interval);
  }, [graphData]);

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
        { alignItems: "center", justifyContent: "center" },
        StyleSheet.absoluteFill,
      ]}
    >
      <ThemedText type="subtitle">Accelerometer</ThemedText>

      <LineGraph
        points={graphData.current.xHist}
        color={textColor}
        animated={true}
      />

      {/* <ThemedText>{graphData.current.xHist[dataPointNum - 1].date.valueOf()}</ThemedText>
      <ThemedText>{graphData.current.yHist[dataPointNum - 1].date.toString()}</ThemedText>
      <ThemedText>{graphData.current.zHist[dataPointNum - 1].date.toString()}</ThemedText> */}
    </View>
  );
}
