import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { addNewTransaction } from "@/app_storage/transactions/transaction";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import CategoryList from "@/components/new/CategoryList";
import Toggle from "@/components/new/Toggle";
import ToastMessage, {
  props,
  setToastMessage,
} from "@/components/Toast/ToastMessage";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { expenseCategories, incomeCategories } from "@/constants/data";
import { vh, vw } from "@/helpers/responsivesizes";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const newEntry = () => {
  const [toast, setToast] = useState<props>({ message: "" });
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"Income" | "Expense">("Income");
  const [category, setCategory] = useState("");
  const { setList } = useContext<TransactioncontextType | any>(
    TransactionContext
  );

  const createTransaction = async () => {
    if (!name || !amount || !category) {
      if (!name && !amount && !category)
        setToastMessage(
          { message: "Please provide the required Information" },
          setToast
        );
      else if (!name)
        setToastMessage(
          { message: "Please provide transaction name" },
          setToast
        );
      else if (!amount)
        setToastMessage({ message: "Amount not Specified" }, setToast);
      else if (!category)
        setToastMessage(
          { message: "Please select a transaction category" },
          setToast
        );
      return;
    }
    const dateCreated = new Date().toLocaleString();
    const submitteddata = {
      name,
      amount,
      description,
      type,
      category,
      dateCreated,
    };

    try {
      const { data, success } = await addNewTransaction(submitteddata);

      if (success) {
        setList(data);
        setAmount(0);
        setCategory("");
        setDescription("");
        setName("");
        router.push("/(tabs)/home");
      } else {
        setToastMessage({ message: data }, setToast);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const theme = useTheme().theme;
  return (
     <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ToastMessage {...toast} />

          {/* top */}
          <View style={styles.top}>
            <GoBack />
            <CustomText size={vh(3)}>New Entry</CustomText>
            <TouchableOpacity onPress={createTransaction}>
              <CustomText color={lightTheme.Secondary} size={vh(2.2)}>
                Save
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* form */}
          <View style={{flex:1}}>
            <TextInput
              value={name}
              onChangeText={setName}
              style={returnThemeStyles(theme, styles.input, styles.inputDark)}
              placeholderTextColor={lightTheme.gray3}
              placeholder="Transaction name"
            />
            <TextInput
              value={amount ? String(amount) : ""}
              onChangeText={(value) => setAmount(Number(value))}
              style={returnThemeStyles(theme, styles.input, styles.inputDark)}
              placeholderTextColor={lightTheme.gray3}
              placeholder="₦Amount"
              inputMode="numeric"
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[
                returnThemeStyles(theme, styles.input, styles.inputDark),
                { height: vh(12), paddingTop: vh(2) , marginBottom:vh(4), },
              ]}
              multiline
              placeholderTextColor={lightTheme.gray3}
              placeholder="Description (optional)"
            />

            <View>
              <CustomText size={vh(2)} color={lightTheme.gray3}>
                Category
              </CustomText>
              <Toggle
                leftClick={() => setType("Income")}
                rightClick={() => setType("Expense")}
              />
              <CategoryList
                active={category}
                setCategory={setCategory}
                data={type === "Income" ? incomeCategories : expenseCategories}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default newEntry;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: lightTheme.white,
   // paddingHorizontal: vw(3),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: vh(5), // gives breathing room at bottom
  },
  top: {
    marginVertical: vh(1.5),
    flexDirection: "row",
    gap: vw(3),
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: vh(7),
    width:vw(92),
  alignSelf:"center",
    backgroundColor: lightTheme.gray1,
    borderColor: lightTheme.gray2,
    borderWidth: 1,
    borderRadius: vh(1.7),
    marginVertical: vh(1),
    paddingHorizontal: 20,
    fontSize: vh(1.9),
  },
  inputDark: {
    height: vh(7),
    width:vw(92),
    alignSelf:"center",
    backgroundColor: DarkTheme.gray3,
    borderColor: lightTheme.gray3,
    borderWidth: 1,
    color: DarkTheme.white,
    borderRadius: vh(1.7),
    marginVertical: vh(1),
    paddingHorizontal: 20,
    fontSize: vh(1.9),
  },
});
