import DataPointProvider from "./DataPointProvider";
import RecordingProvider from "./RecordingProvider";
import SelectedSensorsProvider from "./SelectedSensorsProvider";
import SelectionModeProvider from "./SelectionModeProvider";

type Props = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: Props) {
  return (
    <DataPointProvider>
      <RecordingProvider>
        <SelectedSensorsProvider>
          <SelectionModeProvider>{children}</SelectionModeProvider>
        </SelectedSensorsProvider>
      </RecordingProvider>
    </DataPointProvider>
  );
}
