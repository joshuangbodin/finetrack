import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";

const key = "hidden";

export const getHidden = async () => {
  const data = await AsyncStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(false));
    return false;
  }
};

export const toggleHidden = async () => {
  const value = await getHidden();

  const newValue = !value;
  await AsyncStorage.setItem(key, JSON.stringify(newValue));
};

export const HiddenContext = createContext<contextHiddenprops | null>(null);

export interface contextHiddenprops {
  hidden: boolean;
  setHidden: (val: boolean) => void;
}

interface props {
  children: React.ReactNode;
}

const HiddenProvider = ({ children }: props) => {
  const [hidden, setHidden] = useState(false);
  return (
    <HiddenContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HiddenContext.Provider>
  );
};

export default HiddenProvider;
