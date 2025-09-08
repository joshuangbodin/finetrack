import { user } from "@/types/app";
import React, { createContext, useState } from "react";
import { StyleSheet } from "react-native";

interface props {
  children: React.ReactNode;
}

export interface contextType {
  user: user | undefined;
  setUser: (user: user) => void;
}

export const AuthContext = createContext<contextType | null>(null);

const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<user>();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});
