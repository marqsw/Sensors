/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#e0e0e0",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    lightShadow: "#ffffff",
    darkShadow: "#bebebe",
    border: "#afafaf",
    xAxis: "#f63652",
    yAxis: "#6fa41c",
    zAxis: "#2f84e3",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    lightShadow: "#222526",
    darkShadow: "#08090a",
    border: "#3c3c3c7f",
    xAxis: "#f63652",
    yAxis: "#6fa41c",
    zAxis: "#2f84e3",
  },
};
