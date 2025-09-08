import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface props {
  text?: string;
  onPress?: () => void;
  style?: any;
  textColor?: string;
  logo?: () => ReactNode;
  textStyle?: any;
}

const CustomButton = ({
  text,
  textStyle,
  style,
  textColor,
  logo,
  onPress,
}: props) => {
  const theme = useTheme().theme;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        returnThemeStyles(theme, styles.button, styles.buttonDark),
        style,
      ]}
    >
      {logo && logo()}

      <CustomText
        size={vh(2.3)}
        style={textStyle}
        color={textColor ? textColor : lightTheme.white}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",

    width: "100%",
    height: vh(8.4),
    backgroundColor: lightTheme.primary,
    borderRadius: vh(2),
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
    gap: vw(2),
  },
  buttonDark: {
    flexDirection: "row",
    width: "100%",
    height: vh(8.4),
    backgroundColor: DarkTheme.primary,
    borderRadius: vh(2),
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
    gap: vw(2),
  },
});
