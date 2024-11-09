import RecordedDataProvider from "./RecordedDataJSONContext";
import RecordingProvider from "./RecordingProvider";
import SelectionModeProvider from "./SelectionModeProvider";

type Props = {
  children: React.ReactNode;
};

export default function RecordingContextProvider({ children }: Props) {
  return (
    <RecordingProvider>
      <RecordedDataProvider>
        <SelectionModeProvider>{children}</SelectionModeProvider>
      </RecordedDataProvider>
    </RecordingProvider>
  );
}
