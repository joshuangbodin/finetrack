import { resetProps, user } from "@/types/app";
//import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserData = async (info: user) => {
  const { name, pin, title, dateCreated, avatar } = info;

  if (!name || !pin) {
    return { success: false, data: "Please fill out all the fields" };
  }
  info.dateCreated = new Date();
  info.avatar = avatar ? avatar : 0;
  const userData = JSON.stringify(info);

  try {
    const session = await AsyncStorage.setItem("user", userData);
    return { success: true, data: "User Saved" };
  } catch (err) {
    return {
      success: false,
      data: "We encounted an error while saving your data",
    };
  }
};

export const retrieveUserData = async () => {
  try {
    const response = await AsyncStorage.getItem("user");

    if (response) {
      const data = await JSON.parse(response);
      return { success: true, data: { ...data, pin: null } };
    } else {
      return { success: false, data: "User data not found" };
    }
  } catch (err: any) {
    return { success: false, data: err.message };
  }
};

const retrieveAuthUserData = async () => {
  try {
    const response = await AsyncStorage.getItem("user");

    if (response) {
      const data = await JSON.parse(response);
      return { success: true, data };
    } else {
      return { success: false, data: "User data not found" };
    }
  } catch (err: any) {
    return { success: false, data: err.message };
  }
};

export const authenticateUser = async (name: string, pin: string) => {
  try {
    const authUser = await retrieveAuthUserData();

    if (authUser.success) {
      if (authUser.data.name == name && authUser.data.pin == pin) {
        return { success: true, data: "User Verified" };
      } else {
        console.log(pin);
        return { success: false, data: "User credentials do not match" };
      }
    } else {
      return { success: false, data: "User not found" };
    }
  } catch (err: any) {
    return { success: false, data: err.message };
  }
};

export const deleteUserInfo = async () => {
  await AsyncStorage.clear();
};

export const updateUserName = async (name: string) => {
  const { data, success } = await retrieveAuthUserData();

  if (success) {
    const { success } = await storeUserData({ ...data, name });

    return { success: true, data: "Sucessful" };
  } else {
    return { success: true, data: "Encoutered an Error" };
  }
};

export const updateUserNameAndAvatar = async (name: string, avatar: number) => {
  const { data, success } = await retrieveAuthUserData();

  if (success) {
    const { success } = await storeUserData({ ...data, name, avatar });

    return { success: true, data: { ...data, name, avatar } };
  } else {
    return { success: true, data: "Encoutered an Error" };
  }
};

export const saveResetInfo = async (info: resetProps) => {
  const { data, success } = await retrieveAuthUserData();

  if (success) {
    const { success } = await storeUserData({ ...data, reset: info });

    return { success: true, data: "Saved Successfully" };
  } else {
    return { success: true, data: "Encoutered an Error" };
  }
};

export const loginWithReset = async (answer: string) => {
  const { data, success } = await retrieveAuthUserData();

  if (success) {
    if (data.reset.answer.trim().toLowerCase() == answer.trim().toLowerCase()) {
      return { success, data: "Authenticated" };
    } else return { success: false, data: "Authentication failed" };
  } else {
    return { success: true, data: "Encoutered an Error" };
  }
};
