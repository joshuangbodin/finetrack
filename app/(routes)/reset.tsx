import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { loginWithReset } from "@/app_storage/user/user";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
const AuthImage = require("@/assets/images/Auth pages/forgotpassword.png");

const reset = () => {
  const { user, setUser } = useContext<any>(AuthContext);
  const [answer, setAnswer] = useState("");
  const { theme } = useTheme();

  const HandleSave = async () => {
    if (answer) {
      const { success } = await loginWithReset(answer);
      if (success) {
        router.replace("/(routes)/reset_auth");
      }
    } else {
    }
  };
  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.top}>
            <GoBack />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.form}
          >
            <Image style={styles.image} source={AuthImage} />
            <View style={styles.textview}>
              <CustomText
                style={{ fontWeight: "500" }}
                color={returnThemeStyles(
                  theme,
                  lightTheme.primary,
                  DarkTheme.white
                )}
                size={vh(3)}
              >
                Please Answer Pass-pin
              </CustomText>
              <CustomText
                style={{ fontWeight: "500" }}
                color={returnThemeStyles(
                  theme,
                  lightTheme.primary,
                  DarkTheme.white
                )}
                size={vh(3)}
              >
                Reset Question
              </CustomText>
            </View>

            {user && (
              <CustomText style={{ marginTop: vh(4) }}>
                {user?.reset?.question}
              </CustomText>
            )}

            <TextInput
              style={returnThemeStyles(theme, styles.input, styles.inputDark)}
              value={answer}
              onChangeText={(value) => setAnswer(value)}
              placeholderTextColor={lightTheme.gray3}
              placeholder="your answer goes here"
            />
            <CustomButton onPress={HandleSave} text="Submit" />
          </KeyboardAvoidingView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default reset;

const styles = StyleSheet.create({
  image: {
    width: vw(55),
    height: vw(60),
  },

  container: {
    //  backgroundColor: lightTheme.white,
    paddingHorizontal: vw(3),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: vh(5), // gives breathing room at bottom
  },
  top: {
    marginTop: vh(1.5),
    flexDirection: "row",
    gap: vw(3),
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: vh(8.3),
    backgroundColor: lightTheme.gray1,
    borderColor: lightTheme.gray2,
    borderWidth: 1,
    borderRadius: vh(2),
    marginVertical: vh(2),
    paddingHorizontal: 20,
    fontSize: vh(1.8),
  },

  inputDark: {
    width: "100%",
    height: vh(7),
    backgroundColor: DarkTheme.gray3,
    borderColor: lightTheme.gray3,
    borderWidth: 1,
    color: DarkTheme.white,
    borderRadius: vh(1.7),
    marginVertical: vh(1),
    paddingHorizontal: 20,
    fontSize: vh(1.9),
  },

  form: {
    flex: 1,
    alignItems: "center",
  },

  textview: {
    width: "100%",
  },
});
