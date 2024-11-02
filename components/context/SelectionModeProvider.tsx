import { createContext, Dispatch, SetStateAction, useState } from "react";

export const SelectionModeContext = createContext(false);
export const SetSelectionModeContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function SelectionModeProvider({ children }: Props) {
  const [selectionMode, setSelectionMode] = useState(false);

  return (
    <SelectionModeContext.Provider value={selectionMode}>
      <SetSelectionModeContext.Provider value={setSelectionMode}>
        {children}
      </SetSelectionModeContext.Provider>
    </SelectionModeContext.Provider>
  );
}
