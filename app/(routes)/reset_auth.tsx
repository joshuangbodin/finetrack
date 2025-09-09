import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { storeUserData } from "@/app_storage/user/user";
import PassPin from "@/components/auth/PassPin";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import { props } from "@/components/Toast/ToastMessage";
import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

const reset_auth = () => {
  const [pin, setPin] = useState("");
  const { user, setUser } = useContext<any>(AuthContext);
  const [toast, setToast] = useState<props>({ message: "" });

  const SaveFirstPin = (value: string) => {
    setPin(value);
    value = "";
  };

  const ConfirmFirstPin = async (value: string) => {
    if (pin == value) {
      setUser({ ...user, pin });
      const { success, data } = await storeUserData({ ...user, pin });

      console.log(data);
      if (success) router.push("/(routes)/login");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <GoBack />
      </View>
      <CustomText style={{ textAlign: "center" }}>
        Hi {user && user.name}
      </CustomText>
      {!pin ? (
        <PassPin
          HandleSubmit={SaveFirstPin}
          prompt="Reset Your 4-digit Pin"
        />
      ) : (
        <PassPin
          HandleSubmit={ConfirmFirstPin}
          prompt="Please Confirm 4-digit Pin"
        />
      )}
    </ScreenWrapper>
  );
};

export default reset_auth;

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
