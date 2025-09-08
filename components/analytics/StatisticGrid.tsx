import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { GetTransactionAnalytics } from "@/app_storage/transactions/ExpenseSummary";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { formatCurrency } from "@/helpers/pricecustomization";
import { vh, vw } from "@/helpers/responsivesizes";
import { transaction } from "@/types/app";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../General/ui/CustomText";

interface Statprops {
  title: string;
  value: string | number;
  unit?: string;
  height?: number;
}

interface props {
  data: transaction[];
}

const StatisticGrid = ({ data }: props) => {
  const { NumberOfTransactions, highestCategory, profit, highestSum } =
    GetTransactionAnalytics(data);
  return (
    <View>
      <CustomText
        style={{ textAlign: "center" }}
        size={vh(2)}
        color={lightTheme.gray3}
      >
        Transaction Data
      </CustomText>

      <View style={styles.gridContainer}>
        <View style={styles.gridColumn}>
          <StatCard
            value={NumberOfTransactions}
            height={vh(20)}
            title="No Of Transactions"
          />
          <StatCard
            value={highestCategory}
            height={vh(30)}
            title="Highest Expense Category"
          />
        </View>
        <View style={styles.gridColumn}>
          <StatCard value={formatCurrency(profit, true)} title="Profit/Loss" />
          <StatCard
            value={formatCurrency(highestSum, true)}
            title={`${highestCategory} Category Amount`}
          />
        </View>
      </View>
    </View>
  );
};
const StatCard = ({ title, value, unit, height = vh(25) }: Statprops) => {
  return (
    <View
      style={[
        returnThemeStyles(
          useTheme().theme,
          styles.statCard,
          styles.statCardDark
        ),
        { height },
      ]}
    >
      <CustomText color={lightTheme.gray3} size={vh(2)}>
        {title}
      </CustomText>
      <CustomText style={{ fontWeight: "500" }} size={vh(3)}>
        {value}
      </CustomText>
      <CustomText color={lightTheme.gray3} size={vh(2)}>
        {unit}
      </CustomText>
    </View>
  );
};
export default StatisticGrid;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: vh(2),
    marginBottom: vh(10),
  },
  gridColumn: {
    width: vw(45),
    height: vh(20),
    gap: vh(2),
    paddingBottom: vh(2),
  },
  statCard: {
    width: "100%",
    minHeight: vh(20),
    backgroundColor: lightTheme.gray1,
    paddingVertical: vh(3),
    paddingHorizontal: vw(3),
    borderRadius: vh(3),
    justifyContent: "space-between",
  },
  statCardDark: {
    width: "100%",
    minHeight: vh(20),
    backgroundColor: DarkTheme.gray3,
    paddingVertical: vh(3),
    paddingHorizontal: vw(3),
    borderRadius: vh(3),
    justifyContent: "space-between",
  },
});
