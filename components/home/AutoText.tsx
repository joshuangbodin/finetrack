import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { formatCurrency } from "@/helpers/pricecustomization";
import { vh, vw } from "@/helpers/responsivesizes";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface props {
  amount: number;
  isHidden?: boolean;
}
const AutoText = ({ amount, isHidden = false }: props) => {
  const {theme} = useTheme()
  const text = isHidden ? "******" : formatCurrency(amount);
  return (
    <Text
      style={{
        fontSize: Math.max(
          vh(1.8),
          Math.min(vh(4.5), vw(75) / (text.length / 2))
        ),
        fontWeight: "500",
        textAlignVertical: "bottom",
        color : returnThemeStyles(theme , lightTheme.Black , DarkTheme.white)
      }}
    >
      {text}
    </Text>
  );
};

export default AutoText;

const styles = StyleSheet.create({});
