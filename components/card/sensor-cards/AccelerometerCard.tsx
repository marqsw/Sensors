import { useState, useEffect, useRef, useReducer, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { GraphPoint } from "react-native-graph";
import { UpdateIntervalContext } from "../../context/graphs/UpdateIntervalProvider";
import SensorCard from "../SensorCard";
import { Platform } from "react-native";

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
  Platform.OS === "android" && Accelerometer.setUpdateInterval(updateInterval);

  const [graphData, setGraphData] = useState<GraphPoint[][]>([[], [], []]);
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Accelerometer"
      description="An accelerometer measures the acceleration. It detects forces such as gravity, vibration, and movement."
      liveData={[x, y, z]}
      graphData={graphData}
      setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
    />
  );
}
