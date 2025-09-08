import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vw } from "@/helpers/responsivesizes";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface props {
  children?: React.ReactNode;
  style?: any;
}

const ScreenWrapper = ({ children, style }: props) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        returnThemeStyles(theme, styles.container, styles.containerDark),
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: lightTheme.white,
    paddingHorizontal: vw(3),
  },
  containerDark: {
    flex: 1,
    position: "relative",
    backgroundColor: DarkTheme.Black,
    paddingHorizontal: vw(3),
  },
});
