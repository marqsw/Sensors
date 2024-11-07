import GraphsContextProvider from "./graphs/GraphsContextProvider";
import RecordingContextProvider from "./recording/RecordingContextProvider";

type Props = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: Props) {
  return (
    <GraphsContextProvider>
      <RecordingContextProvider>{children}</RecordingContextProvider>
    </GraphsContextProvider>
  );
}
