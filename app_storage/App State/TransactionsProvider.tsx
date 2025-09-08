import { transaction } from "@/types/app";
import React, { createContext, useState } from "react";
import { StyleSheet } from "react-native";

interface props {
  children: React.ReactNode;
}

export interface TransactioncontextType {
  list: transaction[] | undefined;
  setList: (list: transaction[]) => void;
}

export const TransactionContext = createContext<TransactioncontextType | null>(
  null
);

const TransactionsProvider = ({ children }: props) => {
  const [list, setList] = useState<transaction | any>([]);
  return (
    <TransactionContext.Provider value={{ list, setList }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionsProvider;

const styles = StyleSheet.create({});
