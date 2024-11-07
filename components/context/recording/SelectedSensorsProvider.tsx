import {
  Component,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const SelectedSensorsContext = createContext<Component[]>([]);
export const SetSelectedSensorsContext = createContext<
  Dispatch<SetStateAction<Component[]>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function SelectedSensorsProvider({ children }: Props) {
  const [selectedSensors, setSelectedSensors] = useState<Component[]>([]);

  return (
    <SelectedSensorsContext.Provider value={selectedSensors}>
      <SetSelectedSensorsContext.Provider value={setSelectedSensors}>
        {children}
      </SetSelectedSensorsContext.Provider>
    </SelectedSensorsContext.Provider>
  );
}
