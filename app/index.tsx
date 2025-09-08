import { getTheme, useTheme } from "@/app_storage/App State/Theme";
import { retrieveUserData } from "@/app_storage/user/user";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import { lightTheme } from "@/constants/Colors";
import { vh } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const Logo = require("@/assets/images/logo/logo.png");

const index = () => {
  const [Loading, setLoading] = useState(false);
  const { setTheme } = useTheme();
  useEffect(() => {
    const initializeTheme = async () =>{
      const data = await getTheme()
      setTheme(data)
    }
    const checkUser = async function () {
      setLoading(true);
      const { success } = await retrieveUserData();

      if (success) {
        router.replace("/(routes)/login");
      } else {
        router.replace("/(routes)/onboarding");
      }
      setLoading(false);
    };
    initializeTheme()
    setTimeout(checkUser, 3000);
  }, []);

  return (
    <ScreenWrapper style={styles.container}>
      <Animated.Image entering={FadeIn} style={styles.image} source={Logo} />

      {Loading && (
        <ActivityIndicator
          color={lightTheme.white}
          style={{ marginTop: vh(5) }}
        />
      )}
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },

  image: {
    width: vh(10),
    height: vh(10),
  },
});