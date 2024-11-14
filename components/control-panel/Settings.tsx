import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "@react-native-community/blur";
import { useContext, useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  DataPointNumContext,
  SetDataPointNumContext,
} from "../context/graphs/DataPointNumProvider";
import {
  SetUpdateIntervalContext,
  UpdateIntervalContext,
} from "../context/graphs/UpdateIntervalProvider";
import { ThemedText } from "../ThemedText";
import InputField from "./InputField";

type Props = {
  visible: Boolean;
};

export default function Settings({ visible }: Props) {
  const widthPercentage = useSharedValue(0);
  const opacity = useSharedValue(0);
  const borderColor = useThemeColor({}, "border");

  const dataPointNum = useContext(DataPointNumContext);
  const setDataPointNum = useContext(SetDataPointNumContext);
  const [inputDataPointNum, setInputDataPointNum] = useState(
    dataPointNum.toString()
  );

  useEffect(() => {
    setDataPointNum(parseInt(inputDataPointNum)), [inputDataPointNum];
  });

  const updateInterval = useContext(UpdateIntervalContext);
  const setUpdateInterval = useContext(SetUpdateIntervalContext);
  const [inputUpdateInterval, setInputUpdateInterval] = useState(
    updateInterval.toString()
  );

  useEffect(() => {
    const current = parseInt(inputUpdateInterval);

    current > 200
      ? setUpdateInterval(parseInt(inputUpdateInterval))
      : setUpdateInterval(200);
  }, [inputUpdateInterval]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthPercentage.value}%`,
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    widthPercentage.value = withSpring(visible ? 90 : 20, { mass: 0.5 });
    opacity.value = withSpring(visible ? 1 : 0, { mass: 0.5, damping: 15 });
  }, [visible]);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          aspectRatio: 1,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: borderColor,
          overflow: "hidden",
          padding: "10%",
          // flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        },
      ]}
    >
      <BlurView style={StyleSheet.absoluteFill} blurAmount={20} />
      {/* App info */}
      <View
        style={{
          alignSelf: "flex-start",
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <ThemedText type="title" lightColor="white">
          Sensors
        </ThemedText>
        <Pressable onPress={() => Linking.openURL("https://marqsw.github.io")}>
          <ThemedText type="link">from Marquis</ThemedText>
        </Pressable>
      </View>

      {/* Settings */}
      <View style={{ flex: 2 }}>
        <ScrollView
          style={{ alignContent: "center", flex: 2, flexDirection: "column" }}
          keyboardDismissMode="interactive"
        >
          <InputField
            title="Number of graph points"
            value={inputDataPointNum}
            setValue={setInputDataPointNum}
          />
          <InputField
            title="Update interval in miliseconds (floor limit: 200)"
            value={inputUpdateInterval}
            setValue={setInputUpdateInterval}
          />
        </ScrollView>
      </View>
    </Animated.View>
  );
}
