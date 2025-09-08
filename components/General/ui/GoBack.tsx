import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh } from "@/helpers/responsivesizes";
import { Feather } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface props {
  pathname?: RelativePathString | any;
}

const GoBack = ({ pathname }: props) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => {
        pathname ? router.push(pathname) : router.back();
      }}
      style={returnThemeStyles(theme, styles.backbutton, styles.backbuttonDark)}
    >
      <Feather color={returnThemeStyles(theme, lightTheme.Black, DarkTheme.white)} size={vh(4)} name="chevron-left" />
    </Pressable>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  backbutton: {
    width: vh(5),
    height: vh(5),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: lightTheme.gray1,
    borderRadius: vh(1),
  },
  backbuttonDark: {
    width: vh(5),
    height: vh(5),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: DarkTheme.gray3,
    borderRadius: vh(1),
  },
});
