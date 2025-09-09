import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { saveResetInfo } from "@/app_storage/user/user";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
//const AuthImage = require("@/assets/images/Auth pages/auth1.png");

const savereset = () => {
  const { user, setUser } = useContext<any>(AuthContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { theme } = useTheme();

  const HandleSave = async () => {
    if (answer && question) {
      const resetInfo = { answer, question };
      const { success, data } = await saveResetInfo(resetInfo);
      if (success) {
        setUser({ ...user, reset: resetInfo });
        router.push("/(routes)/done");
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
            <GoBack/>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.form}
          >
            <View style={styles.textview}>
              <CustomText
                style={{ fontWeight: "500" }}
                color={returnThemeStyles(
                  theme,
                  lightTheme.primary,
                  DarkTheme.primary
                )}
                size={vh(4)}
              >
                Set Pass-Pin
              </CustomText>
              <CustomText
                style={{ fontWeight: "500" }}
                color={returnThemeStyles(
                  theme,
                  lightTheme.primary,
                  DarkTheme.primary
                )}
                size={vh(4)}
              >
                Reset Question
              </CustomText>
            </View>

            <View style={{ width: "100%", marginTop: vh(4) }}>
              <CustomText>Enter a question only you can answer</CustomText>
              <TextInput
                style={returnThemeStyles(theme, styles.input, styles.inputDark)}
                value={question}
                onChangeText={(value) => setQuestion(value)}
                placeholderTextColor={lightTheme.gray3}
                placeholder="e.g What is my favorite soccer star"
              />
            </View>

            <View style={{ width: "100%", marginBottom: vh(2) }}>
              <CustomText>Provide The answer to the above question</CustomText>
              <TextInput
                style={returnThemeStyles(theme, styles.input, styles.inputDark)}
                value={answer}
                onChangeText={(value) => setAnswer(value)}
                placeholderTextColor={lightTheme.gray3}
                placeholder="e.g Messi"
              />
            </View>
            <CustomButton onPress={HandleSave} text="Save" />
          </KeyboardAvoidingView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default savereset;

const styles = StyleSheet.create({
  image: {
    width: vw(65),
    height: vw(70),
  },

  container: {
    // backgroundColor: lightTheme.white,
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
