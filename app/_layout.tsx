import AuthProvider from "@/app_storage/App State/AuthProvider";
import ThemeProvider from "@/app_storage/App State/Theme";
import TransactionsProvider from "@/app_storage/App State/TransactionsProvider";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <TransactionsProvider>
          <ThemeProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen
                options={{
                  //  headerShown: false,
                  statusBarHidden: Platform.OS === "android",
                }}
                name="index"
              ></Stack.Screen>
              <Stack.Screen name="(routes)/onboarding"></Stack.Screen>
              <Stack.Screen name="(routes)/signin"></Stack.Screen>
              <Stack.Screen name="(tabs)"></Stack.Screen>
            </Stack>
          </ThemeProvider>
        </TransactionsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
