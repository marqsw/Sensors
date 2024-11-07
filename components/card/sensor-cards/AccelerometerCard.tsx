import { useState, useEffect, useRef, useReducer, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { GraphPoint } from "react-native-graph";
import LineGraphView from "../LineGraphView";
import { UpdateIntervalContext } from "../../context/graphs/UpdateIntervalProvider";
import Card from "../Card";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AccelerometerCard() {
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

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const updateInterval = useContext(UpdateIntervalContext);
  Accelerometer.setUpdateInterval(updateInterval);

  const [graphData, setGraphData] = useState<GraphPoint[][]>([[], [], []]);
  const [milliseconds, setMilliseconds] = useState(0);

  const xAxisColor = useThemeColor({}, "xAxis");
  const yAxisColor = useThemeColor({}, "yAxis");
  const zAxisColor = useThemeColor({}, "zAxis");

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
            alignItems: 'center'
          }}
        >
          <ThemedText type="subtitle">Accelerometer</ThemedText>
          <View style={{ flexDirection: "row", width: '100%', justifyContent: 'space-evenly'}}>
            <ThemedText style={{ color: xAxisColor }}>
              x: {x.toFixed(3)}
            </ThemedText>
            <ThemedText style={{ color: yAxisColor }}>
              y: {y.toFixed(3)}
            </ThemedText>
            <ThemedText style={{ color: zAxisColor }}>
              z: {z.toFixed(3)}
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignSelf: 'stretch'
          }}
        >
          <LineGraphView
            liveData={[x, y, z]}
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
