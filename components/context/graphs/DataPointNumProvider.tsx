import { createContext, Dispatch, SetStateAction, useState } from "react";

export const DataPointNumContext = createContext(10);
export const SetDataPointNumContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function DataPointNumProvider({ children }: Props) {
  const [dataPoint, setDataPoint] = useState(100);

  return (
    <DataPointNumContext.Provider value={dataPoint}>
      <SetDataPointNumContext.Provider value={setDataPoint}>
        {children}
      </SetDataPointNumContext.Provider>
    </DataPointNumContext.Provider>
  );
}
