import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const DataPointContext = createContext(10);
export const SetDataPointContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function DataPointProvider({ children }: Props) {
  const [dataPoint, setDataPoint] = useState(10);

  return (
    <DataPointContext.Provider value={dataPoint}>
      <SetDataPointContext.Provider value={setDataPoint}>
        {children}
      </SetDataPointContext.Provider>
    </DataPointContext.Provider>
  );
}
