import RecordingProvider from "./RecordingProvider";
import SelectedSensorsProvider from "./SelectedSensorsProvider";
import SelectionModeProvider from "./SelectionModeProvider";

type Props = {
  children: React.ReactNode;
};

export default function RecordingContextProvider({ children }: Props) {
  return (
    <RecordingProvider>
      <SelectionModeProvider>
        <SelectedSensorsProvider>{children}</SelectedSensorsProvider>
      </SelectionModeProvider>
    </RecordingProvider>
  );
}
