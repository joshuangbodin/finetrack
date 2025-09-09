import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

const doneImage = require("@/assets/images/done/done.gif");
const doneImageBlack = require("@/assets/images/done/doneblack.gif");

const done = () => {
  useEffect(() => {
    setTimeout(() => router.replace("/(tabs)/home") , 2000)
  }, []);

  const { theme } = useTheme();

  return (
    <ScreenWrapper style={styles.container}>
      <CustomText color={returnThemeStyles(theme , lightTheme.primary , DarkTheme.white)} size={vh(4)}>All Done</CustomText>
      <Image resizeMode="contain" style={styles.img} source={returnThemeStyles(theme, doneImage, doneImageBlack)} />
    </ScreenWrapper>
  );
};

export default done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  img:{
    width:vw(70),
    height: vh(70)
  }
});
