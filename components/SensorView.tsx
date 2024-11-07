import { useState, useEffect, useRef, useReducer } from "react";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { GraphPoint } from "react-native-graph";
import LineGraphView from "./LineGraphView";

export default function SensorView() {
  const updateInterval = 50;
  const [milliseconds, setMilliseconds] = useState(0);
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


  // data
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [graphData, setGraphData] = useState<GraphPoint[][]>([[], [], []]);

  return (
    <LineGraphView
      liveData={[x, y, z]}
      graphData={graphData}
      setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
    />
  );
}
