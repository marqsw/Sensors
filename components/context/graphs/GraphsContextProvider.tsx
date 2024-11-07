import React from "react";
import DataPointNumProvider from "./DataPointNumProvider";
import UpdateIntervalProvider from "./UpdateIntervalProvider";

type Props = {
  children: React.ReactNode;
};

export default function GraphsContextProvider({ children }: Props) {
  return (
    <DataPointNumProvider>
      <UpdateIntervalProvider>{children}</UpdateIntervalProvider>
    </DataPointNumProvider>
  );
}
