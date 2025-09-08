import { AuthContext, contextType } from "@/app_storage/App State/AuthProvider";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { retrieveUserData, updateUserNameAndAvatar } from "@/app_storage/user/user";
import AvatarPicker from "@/components/edit_profile.tsx/AvatarPicker";
import Avatar from "@/components/General/Avatar/Avatar";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const edit_profile = () => {
  const { user, setUser } = useContext<contextType | any>(AuthContext);
  const [name, setName] = useState(user && user.name);
  const [avatar, setAvatar] = useState(user && user.avatar);
  const [showAvatarPicker, setShowAvaterPicker] = useState(false);

  const UpdateUserData = async() => {
    console.log()
    const {data , success} = await updateUserNameAndAvatar(name , avatar)

    if(success){
      setUser(data)
      router.push('/(tabs)/profile')
    }
  };
const theme = useTheme().theme
  const reInitializeUser = async () => {
    const { success, data } = await retrieveUserData();

    if (success) {
      setUser(data);
      setName(data.name);
      setAvatar(data.avatar);
    } else {
      router.push("/(routes)/login");
    }
  };

  if (!user || !name) {
    reInitializeUser();
  } else
    return (
      <ScreenWrapper style={styles.container}>
        <View style={styles.top}>
          <GoBack />
          <CustomText size={vh(3)}>Edit Profile</CustomText>
        </View>

        <View style={{ alignItems: "center" }}>
          <Avatar identifier={avatar} size={vh(15)} />
          <TouchableOpacity onPress={() => setShowAvaterPicker(true)}>
            <CustomText color={lightTheme.primary} size={vh(2)}>
              Change Avatar
            </CustomText>
          </TouchableOpacity>
        </View>

        <TextInput
          style={returnThemeStyles( theme, styles.input , styles.inputDark)}
          value={name}
          onChangeText={(value: any) => setName(value)}
          placeholderTextColor={lightTheme.gray3}
          placeholder="e.g John"
        />

        <CustomButton text="Save" onPress={UpdateUserData}></CustomButton>
        {showAvatarPicker && (
          <AvatarPicker
            setAvatar={(id: number) => setAvatar(id)}
            avatar={avatar}
            close={() => setShowAvaterPicker(false)}
          />
        )}
      </ScreenWrapper>
    );
};

export default edit_profile;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  top: {
    marginVertical: vh(1.5),
    flexDirection: "row",
    gap: vw(3),
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: vh(8),
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
    height: vh(8),
    color: DarkTheme.white ,
    backgroundColor: DarkTheme.gray3,
    borderColor: DarkTheme.gray2,
    borderWidth: 1,
    borderRadius: vh(2),
    marginVertical: vh(2),
    paddingHorizontal: 20,
    fontSize: vh(1.8),
  },
});
