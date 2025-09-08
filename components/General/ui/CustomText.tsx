import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh } from "@/helpers/responsivesizes";
import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface props {
  children?: ReactNode;
  style?: any;
  size?: number;
  color?: string;
}

const CustomText = ({ children, style, size, color }: props) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        returnThemeStyles(theme, styles.Text, styles.TextDark),
        style,
        { fontSize: size },
        { color :color?  color :  returnThemeStyles(theme , lightTheme.Black , DarkTheme.white) },
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  Text: {
    fontSize: vh(1.8),
  },
  TextDark: {
    fontSize: vh(1.8),
    color: DarkTheme.white,
  },
});
