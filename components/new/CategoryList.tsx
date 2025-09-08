import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { category } from "@/types/app";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../General/ui/CustomText";

interface props {
  data: category[];
  setCategory: (catrgory: string) => void;
  active: string;
}

const CategoryList = ({ data, active, setCategory }: props) => {
  const theme = useTheme().theme;
  return (
    <View style={styles.list}>
      {data.map((category: category , index) => (
        <Pressable
        key={index}
          onPress={() => setCategory(category.name)}
          style={[
            returnThemeStyles(theme, styles.listitems, styles.listitemsDark),
            active == category.name && {
              backgroundColor: returnThemeStyles(
                theme,
                lightTheme.Secondary,
                DarkTheme.primary
              ),
            },
          ]}
        >
          {category.logo()}
          <CustomText size={vh(2)}>{category.name}</CustomText>
        </Pressable>
      ))}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: vw(3),
    marginTop: vh(1),
  },
  listitems: {
    padding: vh(1),
    backgroundColor: lightTheme.gray1,
    borderRadius: vw(3),
    flexDirection: "row",
    gap: vw(2),
    justifyContent: "center",
    alignItems: "center",
  },
  listitemsDark: {
    padding: vh(1),
    backgroundColor: DarkTheme.gray3,
    borderRadius: vw(3),
    flexDirection: "row",
    gap: vw(2),
    justifyContent: "center",
    alignItems: "center",
  },
});
