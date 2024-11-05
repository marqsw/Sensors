import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { LineGraph } from "react-native-graph";


export default function GraphTestView() {
  const textColor = useThemeColor({}, "text");

  const graphPoints = [
    { value: 1, date: new Date("1") },
    { value: 2, date: new Date("2") },
    { value: 3, date: new Date("3") },
    { value: 4, date: new Date("4") },
    { value: 5, date: new Date("5") },
    { value: 6, date: new Date("6") },
  ];

  return (
    
    <LineGraph
    style={StyleSheet.absoluteFill}
      points={graphPoints}
      color={textColor}
      animated={true}
    ></LineGraph>
  );
}
