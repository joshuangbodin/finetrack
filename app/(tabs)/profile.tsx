import { AuthContext, contextType } from "@/app_storage/App State/AuthProvider";
import { getTheme, toggleTheme, useTheme } from "@/app_storage/App State/Theme";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import UserInfoCard from "@/components/profile/UserInfoCard";
import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React, { useContext } from "react";
import { StyleSheet, Switch, View } from "react-native";

const profile = () => {
  const { user } = useContext<contextType | any>(AuthContext);
  const { setTheme, theme } = useTheme();

  const ToggleTheme = async () => {
    await toggleTheme();
    const data = await getTheme();

    setTheme(data);
  };
  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <CustomText style={{ fontWeight: "500" }} size={vh(3)}>
          Profile
        </CustomText>
      </View>

      {/* User Infomation Card */}
      <UserInfoCard user={user} />

      {/* Settings */}
      <CustomText
        style={{ fontWeight: "500" }}
        color={lightTheme.gray3}
        size={vh(2.2)}
      >
        App Options
      </CustomText>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <CustomText size={vh(2)}>
            Dark Mode
          </CustomText>
          <View 
          //style={{ transform: [{ scale: 1.2 }] }}
          >
            <Switch onValueChange={ToggleTheme} value={theme === "Dark"} />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default profile;

const styles = StyleSheet.create({
  top: { marginVertical: vh(1) },
  list: {
    paddingVertical: vh(2),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  listContainer: {
    //width: vw(80),
  },
});
