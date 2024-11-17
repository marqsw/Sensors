import { UpdateIntervalContext } from "@/components/context/graphs/UpdateIntervalProvider";
import { Barometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { GraphPoint } from "react-native-graph";
import SensorCard from "../SensorCard";

export default function BarometerCard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const subscribe = () => {
    setSubscription(Barometer.addListener(setData));
  };
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const [{ pressure }, setData] = useState({
    pressure: 0,
  });
  const updateInterval = useContext(UpdateIntervalContext);
  Platform.OS === "android" && Barometer.setUpdateInterval(updateInterval);

  const graphData = useRef<GraphPoint[][]>([[]]);
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Barometer"
      description="A barometer measures atmospheric pressure. It detects changes in air pressure, which can indicate weather patterns, altitude, or environmental conditions."
      liveData={[pressure]}
      axesName={["Pressure"]}
      graphData={graphData}
      // setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
      unit="hPa"
    />
  );
}
