import { UpdateIntervalContext } from "@/components/context/graphs/UpdateIntervalProvider";
import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useState } from "react";
import { GraphPoint } from "react-native-graph";
import SensorCard from "../SensorCard";
import { Platform } from "react-native";

export default function GyroscopeCard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const subscribe = () => {
    setSubscription(Gyroscope.addListener(setData));
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
  Platform.OS === 'android' && Gyroscope.setUpdateInterval(updateInterval);

  const [graphData, setGraphData] = useState<GraphPoint[][]>([[], [], []]);
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Gyroscope"
      liveData={[x, y, z]}
      graphData={graphData}
      setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
    />
  );
}
