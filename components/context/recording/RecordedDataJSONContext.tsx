import { createContext, MutableRefObject, useRef } from "react";
// import { GraphPoint } from "react-native-graph";

type JSONGraphPoint = {
  time: number;
  value: number;
};

export interface AxisData {
  [axesName: string]: JSONGraphPoint[];
}

export interface RecordedDataJSON {
  [sensorTitle: string]: AxisData;
}

export const RecordedDataJSONContext = createContext<
  MutableRefObject<RecordedDataJSON>
>({
  current: {} as RecordedDataJSON,
});

type Props = {
  children: React.ReactNode;
};

export default function RecordedDataJSONProvider({ children }: Props) {
  const RecordedDataJSON = useRef<RecordedDataJSON>({});

  return (
    <RecordedDataJSONContext.Provider value={RecordedDataJSON}>
      {children}
    </RecordedDataJSONContext.Provider>
  );
}
