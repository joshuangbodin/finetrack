import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh } from "@/helpers/responsivesizes";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../General/ui/CustomText";
import PinDial from "./PinDial";
import PinDisplay from "./PinDisplay";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";

interface props {
  prompt: string;
  HandleSubmit: (value: string) => void;
}

const PassPin = ({ prompt, HandleSubmit }: props) => {
  const {theme} = useTheme()
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length == 4) {
      HandleSubmit(value);
      setValue("");
    }
  }, [value]);

  const appendValue = (newChar: string) => {
    if (value.length < 5) {
      setValue(value.trim() + newChar.trim());
    }
  };

  const deleteFromValue = () => {
    if (value.length > 0) {
      setValue(value.trim().slice(0, value.length - 1));
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomText
          style={styles.prompt}
          color={returnThemeStyles( theme,lightTheme.primary , DarkTheme.white)}
          size={vh(2.4)}
        >
          {prompt}
        </CustomText>
        <PinDisplay value={value} />
        <PinDial
          HandleDeleteClick={deleteFromValue}
          HandleNumberClick={appendValue}
        />
      </View>
    </View>
  );
};

export default PassPin;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: vh(5),
  },
  prompt: {
    marginBottom: vh(2),
    textAlign: "center",
    fontWeight: "500",
  },
});
