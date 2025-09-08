import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../General/ui/CustomText";

const midpoint = vw(25);

interface props {
  leftClick: () => void;
  rightClick: () => void;
}

const Toggle = ({ leftClick, rightClick }: props) => {
  const left = useSharedValue(0);
  const theme = useTheme().theme;
  const BackgroundStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(left.value),
    };
  });

  const HandleLeftClick = () => {
    leftClick();
    left.value = 0;
  };

  const HandleRightClick = () => {
    rightClick();
    left.value = midpoint;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          returnThemeStyles(theme, styles.background, styles.backgroundDark),
          BackgroundStyle,
        ]}
      ></Animated.View>

      <Pressable onPress={HandleLeftClick} style={styles.pressable}>
        <CustomText size={vh(2)}>Income</CustomText>
      </Pressable>
      <Pressable onPress={HandleRightClick} style={styles.pressable}>
        <CustomText size={vh(2)}>Expense</CustomText>
      </Pressable>
    </View>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: vh(3),
    marginVertical: vh(2),
    width: vw(50),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  background: {
    position: "absolute",
    width: "50%",
    bottom: -vh(1),
    height: vh(0.5),
    backgroundColor: lightTheme.primary,
    borderRadius: 1000,
  },
  backgroundDark: {
    position: "absolute",
    width: "50%",
    bottom: -vh(1),
    height: vh(0.5),
    backgroundColor: DarkTheme.primary,
    borderRadius: 1000,
  },
  pressable: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
