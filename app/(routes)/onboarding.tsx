import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
const Logo = require("@/assets/images/logo/logo.png");

const onboarding = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <Animated.Image entering={FadeIn} style={styles.image} source={Logo} />

      <Animated.View entering={FadeInDown} style={styles.content}>
        <View>
          <CustomText
            size={vh(5)}
            style={styles.bigtext}
            color={lightTheme.primary}
          >
            Track Your
          </CustomText>
          <CustomText
            size={vh(5)}
            style={styles.bigtext}
            color={lightTheme.primary}
          >
            Expenses
          </CustomText>
          <CustomText
            size={vh(5)}
            style={styles.bigtext}
            color={lightTheme.primary}
          >
            Seamlessly
          </CustomText>
        </View>

        <CustomText size={vh(1.9)} color={lightTheme.primary}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
          totam fugiat asperiores eius iusto provident tempore sunt fuga.
        </CustomText>

        <CustomButton
          onPress={() => router.push("/(routes)/login")}
          style={{}}
          text="Get Started"
        />

      </Animated.View>
    </ScreenWrapper>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.Secondary,
    paddingHorizontal: vw(4),
    paddingVertical: vh(3),
    paddingBottom: vh(5),
  },
  image: {
    width: vh(6),
    height: vh(6),
  },
  bigtext: {
    lineHeight: vh(5.5),
  },

  content: {
    marginTop: "auto",
    gap: vh(2.5),
  },

  link: {
    textAlign: "center",
  },
});
