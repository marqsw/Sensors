import { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { ThemedText } from "./ThemedText";

export default function SensorView() {
  Accelerometer.setUpdateInterval(10);
  const dataPoints = 10;

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  interface DataHistProps {
    xHist: number[];
    yHist: number[];
    zHist: number[];
  }

  const dataHist = useRef<DataHistProps>({
    xHist: Array(dataPoints).fill(0),
    yHist: Array(dataPoints).fill(0),
    zHist: Array(dataPoints).fill(0),
  });

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

  useEffect(() => {
    dataHist.current.xHist = [
      ...dataHist.current.xHist.slice(-dataPoints).concat(x),
    ];
    dataHist.current.yHist = [
      ...dataHist.current.yHist.slice(-dataPoints).concat(y),
    ];
    dataHist.current.zHist = [
      ...dataHist.current.zHist.slice(-dataPoints).concat(z),
    ];
  }, [x, y, z]);

  return (
    <View
      style={[
        { alignItems: "center", justifyContent: "center" },
        StyleSheet.absoluteFill,
      ]}
    >
      <ThemedText type="subtitle">Accelerometer</ThemedText>
      <ThemedText>{dataHist.current.xHist[dataPoints]}</ThemedText>
      <ThemedText>{dataHist.current.yHist[dataPoints]}</ThemedText>
      <ThemedText>{dataHist.current.zHist[dataPoints]}</ThemedText>
    </View>
  );
}
