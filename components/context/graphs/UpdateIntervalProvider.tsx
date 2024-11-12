import { createContext, Dispatch, SetStateAction, useState } from "react";

export const UpdateIntervalContext = createContext(10);
export const SetUpdateIntervalContext = createContext<
  Dispatch<SetStateAction<number>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function UpdateIntervalProvider({ children }: Props) {
  const [updateINterval, setUpdateInterval] = useState(200);

  return (
    <UpdateIntervalContext.Provider value={updateINterval}>
      <SetUpdateIntervalContext.Provider value={setUpdateInterval}>
        {children}
      </SetUpdateIntervalContext.Provider>
    </UpdateIntervalContext.Provider>
  );
}
