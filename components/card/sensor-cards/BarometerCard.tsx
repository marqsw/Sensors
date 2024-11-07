import { UpdateIntervalContext } from "@/components/context/graphs/UpdateIntervalProvider";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useContext, useEffect, useState } from "react";
import { GraphPoint } from "react-native-graph";
import SensorCard from "../SensorCard";
import { Barometer } from "expo-sensors";

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
  Barometer.setUpdateInterval(updateInterval);

  const [graphData, setGraphData] = useState<GraphPoint[][]>([[]]);
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Barometer"
      liveData={[pressure]}
      axisName={["Pressure"]}
      graphData={graphData}
      setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
    />
  );
}
