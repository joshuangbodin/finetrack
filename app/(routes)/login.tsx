import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { retrieveUserData } from "@/app_storage/user/user";
import Avatar from "@/components/General/Avatar/Avatar";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const login = () => {
  const { user, setUser } = useContext<any>(AuthContext);
  const { theme } = useTheme();

  useEffect(() => {
    getUserAuth();
  }, []);

  const getUserAuth = async () => {
    const { success, data } = await retrieveUserData();
    if (success == false) {
      router.push("/(routes)/signin");
    } else {
      setUser(data);
    }
  };

  if (!user) {
    return (
      <View>
        <CustomText>User Not Found</CustomText>
      </View>
    );
  }
  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <GoBack />
      </View>
      <View style={styles.main}>
        <Avatar size={vh(20)} identifier={user.avatar} />

        <CustomButton
          onPress={() => {
            router.push("/(routes)/login_auth");
          }}
          text={`Continue As ${user.name} `}
        />
        <View style={styles.text}>
          <CustomText
            size={vh(2)}
            color={returnThemeStyles(
              theme,
              lightTheme.primary,
              DarkTheme.primary
            )}
          >
            {`Forgot Pass-Pin?`}
          </CustomText>
          <Pressable onPress={()=> router.push('/(routes)/reset')}>
            <CustomText
              size={vh(2)}
              style={{ fontWeight: "500" }}
              color={returnThemeStyles(
                theme,
                lightTheme.primary,
                DarkTheme.primary
              )}
            >
              {`Reset`}
            </CustomText>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.white,
    paddingHorizontal: vw(3),
  },
  top: {
    marginTop: vh(1.5),
    flexDirection: "row",
    gap: vw(3),
    alignItems: "center",
  },
  main: {
    gap: vh(2.5),
    alignItems: "center",
    paddingHorizontal: vw(3),
    justifyContent: "center",
    height: "80%",
  },
  text: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: vw(2),
  },
});
