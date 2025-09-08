import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const key = "theme";

export const getTheme = async (): Promise<"Light" | "Dark"> => {
  const data = await AsyncStorage.getItem(key);
  if (data === "Light" || data === "Dark") {
    return data;
  } else {
    await AsyncStorage.setItem(key, "Light");
    return "Light";
  }
};

export const returnThemeStyles = (
  theme: "Light" | "Dark",
  lightStyles: any,
  darkStyles: any
) => {
  return theme === "Light" ? lightStyles : darkStyles;
};

export const toggleTheme = async () => {
  const value = await getTheme();
  const newValue = value === "Dark" ? "Light" : "Dark";
  await AsyncStorage.setItem(key, newValue);
  return newValue;
};

export interface ThemeContextProps {
  theme: "Light" | "Dark";
  setTheme: (val: "Light" | "Dark") => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context; // gives { theme, setTheme }
};

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  useEffect(() => {
    // Load stored theme on mount
    (async () => {
      const savedTheme = await getTheme();
      setTheme(savedTheme);
    })();
  }, []);

  // Whenever theme changes, persist to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem(key, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
