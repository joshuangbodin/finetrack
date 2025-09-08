import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../General/ui/CustomText";
const keypad_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

interface props {
  HandleNumberClick: (newChar: string) => void;
  HandleDeleteClick: () => void;
}

const PinDial = ({ HandleDeleteClick, HandleNumberClick }: props) => {
  const { theme } = useTheme();
  return (
    <View style={styles.buttonContainer}>
      {keypad_numbers.map((item, index) => (
        <TouchableOpacity
          onPress={() => HandleNumberClick(item)}
          style={[
            returnThemeStyles(theme, styles.button, styles.buttonDark),
            item == "0" && { width: vw(60), borderBottomLeftRadius: vw(5) },
          ]}
          key={index}
        >
          <CustomText color={returnThemeStyles(theme, lightTheme.gray3, DarkTheme.white)} size={vh(3)}>
            {item}
          </CustomText>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={HandleDeleteClick}
        style={[returnThemeStyles(theme, styles.button, styles.buttonDark), { borderBottomRightRadius: vw(5) }]}
      >
        <Feather  color={returnThemeStyles(theme, lightTheme.gray3, DarkTheme.white)} size={vh(3)} name="delete" />
      </TouchableOpacity>
    </View>
  );
};

export default PinDial;

const styles = StyleSheet.create({
  button: {
    width: vw(30),
    height: vh(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.gray1,
  },
  buttonDark: {
    width: vw(30),
    height: vh(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DarkTheme.gray3,
  },
  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: vh(5),
    gap: 4,
  },
});
