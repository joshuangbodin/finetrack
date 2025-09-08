import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomText from "../General/ui/CustomText";

interface props {
  value: string;
}

interface PinDigitProps {
  digitValue: string;
  active: boolean;
}

const PinDisplay = ({ value }: props) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={new Array(4)}
        horizontal
        renderItem={({ index }) => (
          <PinDigit active={index == value.length} digitValue={value[index]} />
        )}
      />
    </View>
  );
};

export default PinDisplay;

const PinDigit = ({ digitValue, active }: PinDigitProps) => {
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (digitValue) {
      setVisible(true);
      setTimeout(() => setVisible(false), 1000);
    }
  }, [digitValue]);
  return (
    <View
      style={[
        styles.pinDigit,
        active && {
          borderColor: returnThemeStyles(
            theme,
            lightTheme.primary,
            DarkTheme.primary
          ),
        },
        // !visible && digitValue && { backgroundColor: lightTheme.primary },
      ]}
    >
      <CustomText
        color={returnThemeStyles(
            theme,
            lightTheme.primary,
            DarkTheme.primary
          )}
        size={!visible && digitValue ? vh(5) : vh(3)}
      >
        {!visible && digitValue ? "*" : digitValue}
      </CustomText>
      {active && <View style={styles.cursor} />}
    </View>
  );
};

const styles = StyleSheet.create({
  pinDigit: {
    position: "relative",
    width: vw(12),
    height: vh(7),
    borderWidth: 1,
    borderRadius: vw(2.2),
    borderColor: lightTheme.gray3,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: vw(4),
    width: "100%",
    justifyContent: "center",
  },
  cursor: {
    width: "60%",
    height: 2,
    backgroundColor: lightTheme.primary,
    position: "absolute",
    bottom: vh(1),
  },
});
