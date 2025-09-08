import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import CustomText from "../General/ui/CustomText";
const background = require("@/assets/images/card/light.jpg");
const background2 = require("@/assets/images/card/Dark.jpg");

interface props {
  index: number;
}

const Card = ({ index }: props) => {
  return (
    <ImageBackground
      source={index % 2 == 0 ? background : background2}
      resizeMode="cover"
      style={styles.card}
    >
      <CustomText
        style={styles.text}
        color={index % 2 == 0 ? lightTheme.gray3 : lightTheme.gray2}
      >
        xxxx 9678
      </CustomText>
    </ImageBackground>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: vw(25.6),
    height: vw(16),
    backgroundColor: lightTheme.gray1,
    marginLeft: vw(3),
    borderRadius: vh(1),
    borderCurve: "continuous",
    overflow: "hidden",
    padding: vw(2),
    justifyContent: "flex-end",
  },
  text: {},
});
