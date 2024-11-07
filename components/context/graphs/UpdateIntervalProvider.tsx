import { createContext, Dispatch, SetStateAction, useState } from "react";

export const UpdateIntervalContext = createContext(10);
export const SetUpdateIntervalContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function UpdateIntervalProvider({ children }: Props) {
  const [dataPoint, setDataPoint] = useState(50);

  return (
    <UpdateIntervalContext.Provider value={dataPoint}>
      <SetUpdateIntervalContext.Provider value={setDataPoint}>
        {children}
      </SetUpdateIntervalContext.Provider>
    </UpdateIntervalContext.Provider>
  );
}
