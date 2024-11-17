import { createContext, Dispatch, SetStateAction, useState } from "react";

export const RecordingContext = createContext(false);

export const SetRecordingContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export default function RecordingProvider({ children }: Props) {
  const [recording, setRecording] = useState(false);

  return (
    <RecordingContext.Provider value={recording}>
      <SetRecordingContext.Provider value={setRecording}>
        {children}
      </SetRecordingContext.Provider>
    </RecordingContext.Provider>
  );
}
