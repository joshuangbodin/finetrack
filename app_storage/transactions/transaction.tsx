import { transaction } from "@/types/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "transactionlist";

export const createTransactionList = async () => {
  try {
    const { success } = await retrieveTransactionList();

    if (success) return { success: false, data: "List Already Exists" };
    else {
      const data = JSON.stringify([]);
      await AsyncStorage.setItem(key, data);
      return { success: true, data: "List Created" };
    }
  } catch (error: any) {
    return { success: false, data: error.message };
  }
};

export const retrieveTransactionList = async () => {
  try {
    const stringdata = await AsyncStorage.getItem(key);
    if (!stringdata) {
      return { success: false, data: "Can't Find List , try again" };
    }
    const data = JSON.parse(stringdata);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, data: error.message };
  }
};

export const addNewTransaction = async (transaction: transaction) => {
  try {
    const oldList = await retrieveTransactionList();

    if (!oldList.success) {
      return oldList;
    }

    const newlist = [transaction, ...oldList.data];
    const data = JSON.stringify(newlist);
    await AsyncStorage.setItem(key, data);

    return { success: true, data: newlist };
  } catch (error: any) {
    return { success: false, data: error.message };
  }
};

export const deleteTransaction = async (transaction: transaction) => {
  try {
    const oldList = await retrieveTransactionList();

    if (!oldList.success) {
      return oldList;
    }

    const newlist = oldList.data.filter((item: transaction) => {
      if (item.dateCreated !== transaction.dateCreated) return item;
    });
    const data = JSON.stringify(newlist);
    await AsyncStorage.setItem(key, data);

    return { success: true, data: newlist };
  } catch (error: any) {
    return { success: false, data: error.message };
  }
};
