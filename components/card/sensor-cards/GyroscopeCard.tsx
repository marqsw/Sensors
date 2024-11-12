import { UpdateIntervalContext } from "@/components/context/graphs/UpdateIntervalProvider";
import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useRef, useState } from "react";
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
  Gyroscope.setUpdateInterval(updateInterval);

  const graphData = useRef<GraphPoint[][]>([[], [], []])
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Gyroscope"
      description="A gyroscope measures the rate of rotation around an axis. It detects changes in orientation and angular velocity, helping to track the rotational movement."
      liveData={[x, y, z]}
      graphData={graphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
    />
  );
}
