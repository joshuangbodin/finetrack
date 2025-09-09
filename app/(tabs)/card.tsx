import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";

import React from "react";
import { Image, StyleSheet, View } from "react-native";

const card = () => {
  const {theme} = useTheme()
  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <CustomText style={{ fontWeight: "500" }} size={vh(3)}>
          Cards
        </CustomText>
      </View>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText
          color={returnThemeStyles(theme , lightTheme.primary , DarkTheme.white)}
          style={{ fontWeight: "500" }}
          size={vh(4)}
        >
          Link your Bank Cards{" "}
        </CustomText>
        <Image
          resizeMode="contain"
          source={require("@/assets/images/card/cards.png")}
          style={styles.image}
        />
        <CustomText
          color={lightTheme.Secondary}
          style={{ fontWeight: "500" }}
          size={vh(3)}
        >
          Coming Soon!
        </CustomText>
      </View>
    </ScreenWrapper>
  );
};

export default card;

const styles = StyleSheet.create({
  top: { marginVertical: vh(1) },
  image: {
    width: vw(80),
    height: vh(50),
  },
});
