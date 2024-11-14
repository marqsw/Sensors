import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

type Props = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  unit?: string;
};

export default function InputField({ title, value, setValue, unit }: Props) {
  const borderColor = useThemeColor({}, "border");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <ThemedText style={{ flex: 3, alignSelf: "center" }} lightColor="white">
        {title}
      </ThemedText>
      <TextInput
        keyboardType="number-pad"
        value={value}
        onChangeText={setValue}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: borderColor,
          textAlign: "center",
          color: "white",
          borderRadius: 10,
          alignSelf: "center",
          padding: "5%",
        }}
      />
      {unit && <TextInput>{unit}</TextInput>}
    </View>
  );
}
