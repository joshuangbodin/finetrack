import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

const key = "theme";

export const getTheme = async () => {
  const data = await AsyncStorage.getItem(key);

  if (data) {
    return data;
  } else {
    await AsyncStorage.setItem(key, "Light");
    return "Light";
  }
};

export const returnThemeStyles = (
  theme: "Light" | "Dark",
  lighStyles: any,
  DarkStyles: any
) => {
  return theme !== "Light" ? lighStyles : DarkStyles;
};

export const toggleTheme = async () => {
  const value = await getTheme();

  const newValue = value == "Dark" ? "Light" : "Dark";
  await AsyncStorage.setItem(key, newValue);
};

export const ThemeContext = createContext<ThemeContextprops | any>(null);

export interface ThemeContextprops {
  theme: "Light" | "Dark";
  setTheme: (val: "Light" | "Dark") => void;
}

export const useTheme = () => {
  const context = useContext<ThemeContextprops | any>(ThemeContext);
  return {theme:context , setTheme:context};
};

interface props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: props) => {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
