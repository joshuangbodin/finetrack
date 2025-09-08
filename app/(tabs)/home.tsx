import { AuthContext, contextType } from "@/app_storage/App State/AuthProvider";
import HiddenProvider from "@/app_storage/App State/hidden";
import { getTheme, returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import {
  TransactionContext,
  TransactioncontextType,
} from "@/app_storage/App State/TransactionsProvider";
import { retrieveTransactionList } from "@/app_storage/transactions/transaction";
import { retrieveUserData } from "@/app_storage/user/user";
import Avatar from "@/components/General/Avatar/Avatar";
import ScreenWrapper from "@/components/General/ScreenWrapper";
import CustomButton from "@/components/General/ui/CustomButton";
import CustomText from "@/components/General/ui/CustomText";
import AmountDisplay from "@/components/home/AmountDisplay";
import TransactionCard from "@/components/home/TransactionCard";
import ToastMessage, { props } from "@/components/Toast/ToastMessage";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const home = () => {
  const [toast] = useState<props>({ message: "" });
  const { setTheme } = useTheme();
  const { user, setUser } = useContext<contextType | any>(AuthContext);

  const { list, setList } = useContext<TransactioncontextType | any>(
    TransactionContext
  );

  const initializeTheme = async () => {
    const data = await getTheme();
    setTheme(data);
  };

  useEffect(() => {
    if (!user) {
      reInitializeUser();
    }
    initializeTheme();
    InitializeTransactionList();
  }, []);

  const InitializeTransactionList = async () => {
    const { data, success } = await retrieveTransactionList();

    if (success) {
      setList(data);
    }
  };

  const reInitializeUser = async () => {
    const { success, data } = await retrieveUserData();

    if (success) {
      setUser(data);
    } else {
      router.push("/(routes)/login");
    }
  };

  return (
    <ScreenWrapper>
      <HiddenProvider>
        <ToastMessage {...toast} />
        <View style={styles.top}>
          <View>
            <CustomText style={{ fontWeight: "500" }} size={vh(3)}>
              Hi , {user ? user.name : "User"}
            </CustomText>
            <CustomText color={lightTheme.gray3}>Welcome Back</CustomText>
          </View>

          <Pressable>
            <Avatar size={vh(5)} identifier={user?.avatar} />
          </Pressable>
        </View>

        {/* amount display */}
        <View
          style={{
            marginTop: vh(2),
            borderBottomWidth: vh(1.5),
            paddingBottom: vh(4),
            borderColor: returnThemeStyles(useTheme().theme ,lightTheme.gray1 , DarkTheme.Black),
          }}
        >
          <CustomText size={vh(2)} color={lightTheme.gray3}>
            Wallet Balance
          </CustomText>
          <AmountDisplay />

          {/* Add New Transaction */}

          <CustomButton
            text="New Transaction"
            textStyle={{ fontWeight: "500" }}
            textColor={lightTheme.primary}
            logo={() => (
              <Feather
                size={vh(2.5)}
                color={lightTheme.primary}
                name="plus-circle"
              />
            )}
            onPress={() => {
              router.push("/(routes)/new");
            }}
            style={[
              styles.transactionbuttons,
              { backgroundColor: lightTheme.Secondary },
            ]}
          />
        </View>
        <View>
          
            <View style={styles.listHeader}>
              <CustomText style={{ fontWeight: "500" }} size={vh(2)}>
                Transaction List
              </CustomText>
            </View>
            <FlatList
              ListFooterComponent={<View style={{ height: vh(10) }} />}
              data={list}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TransactionCard index={index} {...item}/>
              )}
              style={styles.list}
            />
          
        </View>
      </HiddenProvider>
    </ScreenWrapper>
  );
};

export default home;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: vh(1),
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: vh(2.5),
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: vw(1),
    justifyContent: "center",
  },

  transactionbuttons: {
    marginTop: vh(3),
    height: vh(5),
    width: "100%",
    borderRadius: 1000,
  },

  list: {
    height: "auto",
    maxHeight: vh(40),
  },
});
