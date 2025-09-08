import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { user } from "@/types/app";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Avatar from "../General/Avatar/Avatar";
import CustomButton from "../General/ui/CustomButton";
import CustomText from "../General/ui/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface props {
  user: user | any;
}



const UserInfoCard = ({ user }: props) => {

  const handleDeleteAllData = () => {
  Alert.alert(
    "Confirm Delete",
    "This will clear all your data and restart the app. Are you sure?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.clear(); // clears all stored keys
            router.replace("/"); // go back to app entry (adjust to your first screen route)
          } catch (error) {
            console.error("Error clearing AsyncStorage:", error);
            Alert.alert("Error", "Something went wrong while deleting data.");
          }
        },
      },
    ]
  );
};


  const theme = useTheme().theme
  return (
    <View
      style={returnThemeStyles(
        theme,
        styles.container,
        styles.containerDark
      )}
    >
      <View style={styles.info}>
        <Avatar identifier={user && user.avatar} size={vh(8)} />
        <View style={styles.text}>
          <CustomText style={{ fontWeight: "500" }} size={vh(2.8)}>
            {user ? user.name : "User"}
          </CustomText>
          <CustomText color={lightTheme.gray3} size={vh(2)}>
            level 1
          </CustomText>
        </View>
      </View>

      <View style={styles.buttonscontainer}>
        <CustomButton
          textColor={returnThemeStyles(theme , lightTheme.Black , DarkTheme.white)}
          text="Edit"
          onPress={() => router.push("/(routes)/edit_profile")}
          style={[styles.buttons, { backgroundColor: returnThemeStyles(
        theme,
        lightTheme.gray2,
        DarkTheme.Black
      ) }]}
        />
        <CustomButton onPress={handleDeleteAllData} text="Clear Info" style={styles.buttons} />
      </View>
    </View>
  );
};

export default UserInfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.gray1,
    padding: vw(3),
    borderRadius: vw(3),
    marginVertical: vh(2),
  },

  containerDark: {
    backgroundColor: DarkTheme.black1,
    padding: vw(3),
    borderRadius: vw(3),
    marginVertical: vh(2),
  },

  info: {
    flexDirection: "row",
    gap: vw(3),
  },
  text: {
    //height: "100%",
    justifyContent: "center",
    gap: vh(0.5),
    paddingLeft: vw(2),
  },
  buttonscontainer: {
    marginTop: vh(2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    width: vw(41),
    height: vh(6),
  },
});
