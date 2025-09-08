import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CustomText from "../General/ui/CustomText";

interface labelProps {
  text: string;
  color: string;
  value: number;
}

interface props {
  data: any;
}

const DonutChart = ({ data }: props) => {
  return (
    <View style={styles.chartContainer}>
      <PieChart
        innerRadius={40}
        textSize={vh(2)}
        textColor={lightTheme.white}
        data={data}
        donut
      />
      <View style={styles.labelList}>
        {data.map(
          (
            item: React.JSX.IntrinsicAttributes & labelProps,
            index: React.Key | null | undefined
          ) => (
            <Label key={index} {...item} />
          )
        )}
      </View>
    </View>
  );
};

export default DonutChart;

const Label = ({ text, color, value }: labelProps) => {
  if (value == 0) return;
  return (
    <View style={styles.label}>
      <View style={[styles.labelColorBox, { backgroundColor: color }]} />
      <CustomText>{text}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: vh(50),
  },

  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: vw(2),
  },
  labelColorBox: {
    width: vh(2),
    height: vh(2),
    borderRadius: vh(0.4),
    backgroundColor: lightTheme.gray1,
  },
  labelList: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: vw(4),
    height: vh(10),
    marginTop: vh(2),
    marginBottom: vh(5),
    alignItems:"center",
    justifyContent: "center"
  },
});
