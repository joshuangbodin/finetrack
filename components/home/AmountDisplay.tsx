import {
  contextHiddenprops,
  getHidden,
  HiddenContext,
  toggleHidden,
} from "@/app_storage/App State/hidden";
import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { CalculateExpenseSummary } from "@/app_storage/transactions/ExpenseSummary";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { formatCurrency } from "@/helpers/pricecustomization";
import { vh, vw } from "@/helpers/responsivesizes";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../General/ui/CustomText";
import AutoText from "./AutoText";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";

interface props {
  amount: number;
}
interface displayCardProps {
  amount: number;
  title: string;
  isHidden: boolean;
}
const AmountDisplay = () => {
  const { list } = useContext<TransactioncontextType | any>(TransactionContext);
  const { hidden, setHidden } = useContext<contextHiddenprops | any>(
    HiddenContext
  );

  const {theme} = useTheme()

  useEffect(() => {
    const initializeHidden = async () => {
      const data = await getHidden()
      if(data) setHidden(data)
    }

    initializeHidden()
  } , []);
  
  const HandleClick = async() => {
    await toggleHidden()
    setHidden(!hidden);
  }


  return (
    <View>
      <View style={styles.container}>
        <AutoText
          isHidden={hidden}
          amount={CalculateExpenseSummary(list).total}
        />
        <Pressable
          onPress={HandleClick}
        >
          <FontAwesome6 color={returnThemeStyles(theme , lightTheme.Black , DarkTheme.white)} size={vh(3.5)} name={hidden ? "eye-slash" : "eye"} />
        </Pressable>
      </View>
      <View style={styles.incExp}>
        <DisplayCard
          title="Income"
          amount={CalculateExpenseSummary(list).income}
          isHidden={hidden}
        />
        <DisplayCard
          title="Expense"
          amount={CalculateExpenseSummary(list).expense}
          isHidden={hidden}
        />
      </View>
    </View>
  );
};

export default AmountDisplay;

const DisplayCard = ({ title, amount, isHidden }: displayCardProps) => {
  return (
    <View style={{ width: vw(45) }}>
      <CustomText  color={lightTheme.gray3}>
        {title}
      </CustomText>
      <CustomText style={{ fontWeight: "500" }} size={vh(2.6)}>
        {isHidden ? "******" : formatCurrency(amount, true)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: vh(10),
    paddingHorizontal: vw(1.5),
  },
  incExp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
