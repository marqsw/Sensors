import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useRef, useState } from "react";
import { GraphPoint } from "react-native-graph";
import { UpdateIntervalContext } from "../../context/graphs/UpdateIntervalProvider";
import SensorCard from "../SensorCard";

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

  const graphData = useRef<GraphPoint[][]>([[], [], []]);
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Accelerometer"
      description="An accelerometer measures the acceleration. It detects forces such as gravity, vibration, and movement."
      liveData={[x, y, z]}
      graphData={graphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
      unit={"g"}
    />
  );
}
