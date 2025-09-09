import AuthProvider from "@/app_storage/App State/AuthProvider";
import ThemeProvider, { getTheme } from "@/app_storage/App State/Theme";
import TransactionsProvider from "@/app_storage/App State/TransactionsProvider";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {


  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <TransactionsProvider>
          <ThemeProvider>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
              }}
            >
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "slide_from_right",
                  statusBarHidden: Platform.OS === "android",
                }}
              >
                <Stack.Screen
                  options={
                    {
                      //  headerShown: false,
                    }
                  }
                  name="index"
                ></Stack.Screen>
                <Stack.Screen name="(routes)/onboarding"></Stack.Screen>
                <Stack.Screen name="(routes)/signin"></Stack.Screen>
                <Stack.Screen name="(tabs)"></Stack.Screen>
              </Stack>
            </View>
          </ThemeProvider>
        </TransactionsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
