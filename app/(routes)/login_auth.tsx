import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { authenticateUser } from "@/app_storage/user/user";
import PassPin from "@/components/auth/PassPin";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import GoBack from "@/components/General/ui/GoBack";
import ToastMessage, {
  props,
  setToastMessage,
} from "@/components/Toast/ToastMessage";
import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const login_auth = () => {
  const { user } = useContext<any>(AuthContext);
  const [toast, setToast] = useState<props>({ message: "" });

  const Submit = async (value: string) => {
    try {
      const { success, data } = await authenticateUser(user.name, value);

      if (success) {
        router.replace("/(tabs)/home");
      } else {
        setToastMessage({ message: data }, setToast);
      }
    } catch (err: any) {
      setToastMessage({ message: err.message }, setToast);
    }
  };

  return (
    <ScreenWrapper>
      <ToastMessage {...toast} />
      <View style={styles.top}>
        <GoBack />
      </View>

      <PassPin HandleSubmit={Submit} prompt="Please Enter Your 4-digit Pin" />
    </ScreenWrapper>
  );
};

export default login_auth;

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
});
