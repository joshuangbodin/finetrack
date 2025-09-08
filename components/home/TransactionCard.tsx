import { vh, vw } from "@/helpers/responsivesizes";
import React, { useContext } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../General/ui/CustomText";

import {
  contextHiddenprops,
  HiddenContext,
} from "@/app_storage/App State/hidden";
import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { deleteTransaction } from "@/app_storage/transactions/transaction";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { ReturnCategoryLogo } from "@/constants/data";
import { formatCurrency } from "@/helpers/pricecustomization";
import { transaction } from "@/types/app";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const THRESH_HOLD = -1 * vw(70);

const TransactionCard = ({
  name,
  amount,
  category,
  description,
  dateCreated,
  type,
}: transaction) => {
  const transX = useSharedValue(0);
  const deleteWidth = useSharedValue(0);
  const display = useSharedValue<"flex" | "none">("flex");
  const { setList } = useContext<TransactioncontextType | any>(
    TransactionContext
  );
  const { theme } = useTheme();
  const { hidden } = useContext<contextHiddenprops | any>(HiddenContext);

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        if (transX.value > THRESH_HOLD) transX.value = event.translationX;
        if (event.translationX < -vh(12)) deleteWidth.value = -1 * transX.value;
      } else {
        transX.value = 0;
        deleteWidth.value = 0;
        display.value = "flex";
      }
    })
    .onEnd(() => {
      if (transX.value > THRESH_HOLD) {
        if (transX.value !== 0) {
          deleteWidth.value = vh(12);
          transX.value = -vh(12);
        }
      } else {
      }
    });

  const deleteHandler = async () => {
    const { data, success } = await deleteTransaction({
      name,
      amount,
      category,
      description,
      dateCreated,
      type,
    });
    if (success) {
      transX.value = 0;
      deleteWidth.value = 0;
      display.value = "flex";
      setList(data);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transX.value }],

      display: display.value,
      backgroundColor: theme
        ? interpolateColor(
            transX.value,
            [0, THRESH_HOLD],
            [lightTheme.white, lightTheme.gray2]
          )
        : interpolateColor(
            transX.value,
            [0, THRESH_HOLD],
            [DarkTheme.Black, DarkTheme.gray3]
          ),
    };
  });

  const deleteStyles = useAnimatedStyle(() => {
    return {
      width: deleteWidth.value,
      right: -deleteWidth.value,
      display: display.value,
    };
  });

  const { logo, color } = ReturnCategoryLogo({ name: category, type });

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(routes)/view",
          params: { name, amount, category, description, dateCreated, type },
        })
      }
    >
      
        <Animated.View style={[styles.container, animatedStyles]}>
          <View style={[styles.left, { backgroundColor: color }]}>
            {logo(lightTheme.white)}
          </View>
          <View style={styles.right}>
            <View style={styles.textup}>
              <CustomText style={{ fontWeight: "500" }} size={vh(2)}>
                {name}
              </CustomText>
              <CustomText style={{ fontWeight: "500" }} size={vh(2.2)}>
                {!hidden ? formatCurrency(amount, true) : "******"}
              </CustomText>
            </View>
            <View style={styles.textup}>
              <CustomText color={lightTheme.gray3}>{dateCreated}</CustomText>
              <CustomText color={lightTheme.gray3}>{type}</CustomText>
            </View>
          </View>
          <Animated.View style={[styles.delete, deleteStyles]}>
            <Pressable
              onPress={deleteHandler}
              style={returnThemeStyles(
                theme,
                styles.deleteButton,
                styles.deleteButtonDark
              )}
            >
              <FontAwesome color={lightTheme.white} size={vh(3)} name="trash" />
            </Pressable>
          </Animated.View>
        </Animated.View>
      
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(2),
    gap: vw(3),
    position: "relative",
    backgroundColor: "black",
  },
  left: {
    width: vh(6),
    height: vh(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.Secondary,
    borderRadius: 1000,
  },
  right: {
    flex: 1,
    height: vh(6.3),
    flexDirection: "column",
    justifyContent: "space-between",
  },

  textup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  delete: {
    width: vh(10),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: vw(2),
    position: "absolute",
    right: -vh(8),
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.primary,
    width: "100%",
  },
  deleteButtonDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DarkTheme.primary,
    width: "100%",
  },
});
