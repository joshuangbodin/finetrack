import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { deleteTransaction } from "@/app_storage/transactions/transaction";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import GoBack from "@/components/General/ui/GoBack";
import AutoText from "@/components/home/AutoText";
import { lightTheme } from "@/constants/Colors";
import { ReturnCategoryLogo } from "@/constants/data";
import { vh, vw } from "@/helpers/responsivesizes";
import { transaction } from "@/types/app";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

const view = () => {
  const {
    name,
    amount,
    category,
    description,
    dateCreated,
    type,
  }: transaction | any = useLocalSearchParams();
  const { setList } = useContext<TransactioncontextType | any>(
    TransactionContext
  );

  const DeleteTransaction = async () => {
    const { success, data } = await deleteTransaction({
      name,
      amount,
      category,
      description,
      dateCreated,
      type,
    });

    if (success) {
      setList(data);
      router.push('/(tabs)/home')
    }
  };

  const categoryInfo = ReturnCategoryLogo({ name: String(category), type: type })
  return (
    <ScreenWrapper>
      <View style={styles.top}>
        <GoBack />
        <CustomText size={vh(3)}>{name}</CustomText>
      </View>

      <View style={styles.amountContainer}>
        <AutoText amount={Number(amount)} />
        <View
          style={[
            styles.type,
            type == "Expense" && { backgroundColor: lightTheme.red },
          ]}
        >
          <FontAwesome
            color={lightTheme.white}
            size={vh(2)}
            name={type == "Expense" ? "minus" : "plus"}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <View style={[styles.category , {backgroundColor:categoryInfo.color}]}>
          {categoryInfo.logo(lightTheme.white)}
          <CustomText color={lightTheme.white}>{category}</CustomText>
        </View>
        <CustomText color={lightTheme.gray3}>{dateCreated}</CustomText>
      </View>

      {description && (
        <View style={{marginVertical: vh(2)}}>
          <CustomText size={vh(2)} color={lightTheme.gray3}>
            Description
          </CustomText>
          <CustomText size={vh(1.9)}>{description}</CustomText>
        </View>
      )}

      <CustomButton style={{backgroundColor:lightTheme.red , height:vh(6)}} text="Delete Transaction" onPress={DeleteTransaction} />
    </ScreenWrapper>
  );
};

export default view;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.white,
    paddingHorizontal: vw(3),
  },
  top: {
    marginVertical: vh(1.5),
    flexDirection: "row",
    gap: vw(3),
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: vh(2),
  },
  type: {
    borderRadius: 100,
    padding: vw(2),
    backgroundColor: lightTheme.green
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: vh(3),
    alignItems: "center",
  },

  category: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    minWidth: vw(20),
    justifyContent: "center",
    backgroundColor: lightTheme.gray2,
    paddingHorizontal: vw(2),
    paddingVertical: vh(0.5),
    gap: vw(1.5),
    borderRadius: vw(2),
  },
});
