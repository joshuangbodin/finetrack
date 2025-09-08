import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { GetChartData } from "@/app_storage/transactions/ExpenseSummary";
import DonutChart from "@/components/analytics/DonutChart";
import StatisticGrid from "@/components/analytics/StatisticGrid";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomText from "@/components/General/ui/CustomText";
import { lightTheme } from "@/constants/Colors";
import { vh } from "@/helpers/responsivesizes";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const analytics = () => {
  const { list } = useContext<TransactioncontextType | any>(TransactionContext);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollcontainer}
      style={{ flex: 1 , backgroundColor:lightTheme.white}}
      showsVerticalScrollIndicator={false}
    >
      <ScreenWrapper>
        <View style={styles.top}>
          <CustomText style={{ fontWeight: "500" }} size={vh(3)}>
            Analytics
          </CustomText>
        </View>
        {/* Chart */}
        <DonutChart data={GetChartData(list)} />
        <StatisticGrid data={list} />
      </ScreenWrapper>
    </ScrollView>
  );
};

export default analytics;

const styles = StyleSheet.create({
  top: { marginVertical: vh(1) },
  scrollcontainer: {
    flexGrow: 1,
    paddingBottom: vh(30),
  },
});
