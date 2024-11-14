import { UpdateIntervalContext } from "@/components/context/graphs/UpdateIntervalProvider";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useRef, useState } from "react";
import { GraphPoint } from "react-native-graph";
import SensorCard from "../SensorCard";
import { LightSensor } from "expo-sensors";
import { Platform } from "react-native";

export default function LightsensorCard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const subscribe = () => {
    setSubscription(LightSensor.addListener(setData));
  };
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const [{ illuminance }, setData] = useState({
    illuminance: 0,
  });
  const updateInterval = useContext(UpdateIntervalContext);
  LightSensor.setUpdateInterval(updateInterval);

  const graphData = useRef<GraphPoint[][]>([[]])
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Light Sensor"
      description="A light sensor measures the intensity of light in the environment. It detects changes in light levels."
      liveData={[illuminance]}
      axesName={["illuminance"]}
      graphData={graphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
      unit="lux"
    />
  );
}
