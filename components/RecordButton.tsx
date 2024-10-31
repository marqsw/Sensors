import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";


export default function RecordButton() {

  const size = useSharedValue(50)

  const handleOnPressIn = () => {
   size.value =  withSpring(40)
  } 

  const handleOnPressOut = () => {
    size.value = withSpring(50)
  }

  const borderColor = useThemeColor({}, 'text')


  return (
    <Pressable onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <View style={[{
        borderColor: borderColor,
        borderWidth: 3,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
      }, styles.circle]}>
          <Animated.View
            style={[{
              height: size,
              backgroundColor: "red",
            }, styles.circle]}
          />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 99999,
        aspectRatio: 1,
    }
})
