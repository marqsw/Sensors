import { useState, useEffect, useRef, useReducer, useContext } from "react";
import { Subscription } from "expo-sensors/build/Pedometer";
import { GraphPoint } from "react-native-graph";
import { UpdateIntervalContext } from "../../context/graphs/UpdateIntervalProvider";
import SensorCard from "../SensorCard";
import { Magnetometer } from "expo-sensors";

export default function MagnetometerCard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const subscribe = () => {
    setSubscription(Magnetometer.addListener(setData));
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
  Magnetometer.setUpdateInterval(updateInterval);

  const graphData = useRef<GraphPoint[][]>([[], [], []])
  const [milliseconds, setMilliseconds] = useState(0);

  return (
    <SensorCard
      title="Magnetometer"
      description="A magnetometer measures the strength and direction of magnetic fields. It detects magnetic forces."
      liveData={[x, y, z]}
      graphData={graphData}
      // setGraphData={setGraphData}
      milliseconds={milliseconds}
      setMilliseconds={setMilliseconds}
      unit="μT"
    />
  );
}
