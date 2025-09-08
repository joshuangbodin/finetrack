import { AuthContext } from "@/app_storage/App State/AuthProvider";
import { createTransactionList } from "@/app_storage/transactions/transaction";
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

const signin_auth = () => {
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
      await createTransactionList()
      if (success) router.push("/(tabs)/home");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <GoBack />
      </View>
      <CustomText>Hi {user && user.name}</CustomText>
      {!pin ? (
        <PassPin
          HandleSubmit={SaveFirstPin}
          prompt="Please Enter Your 4-digit Pin"
        />
      ) : (
        <PassPin
          HandleSubmit={ConfirmFirstPin}
          prompt="Please Confirm Your 4-digit Pin"
        />
      )}
    </ScreenWrapper>
  );
};

export default signin_auth;

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
