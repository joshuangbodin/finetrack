import { returnThemeStyles, useTheme } from "@/app_storage/App State/Theme";
import { DarkTheme, lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

const _layout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: lightTheme.gray2,
        tabBarActiveTintColor: returnThemeStyles(
            theme,
            lightTheme.primary,
            DarkTheme.primary
          ),
        tabBarStyle: {
          paddingTop: vh(1.5),
          borderWidth: 0,
          height: Platform.OS == "ios"? vh(10): vh(12),
          backgroundColor: returnThemeStyles(
            theme,
            lightTheme.white,
            DarkTheme.Black
          ),
          shadowColor: returnThemeStyles(
            theme,
            lightTheme.gray2,
            DarkTheme.Black
          ),
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIcon}>
              <AntDesign color={color} size={vw(6)} name="home" />
              <View
                style={[
                  styles.Active,
                  { backgroundColor: focused ? color : "transparent" },
                ]}
              />
            </View>
          ),
          title: "",
        }}
        name="home"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIcon}>
              <AntDesign color={color} size={vw(6)} name="barschart" />
              <View
                style={[
                  styles.Active,
                  { backgroundColor: focused ? color : "transparent" },
                ]}
              />
            </View>
          ),
          title: "",
        }}
        name="analytics"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIcon}>
              <AntDesign color={color} size={vw(6)} name="creditcard" />
              <View
                style={[
                  styles.Active,
                  { backgroundColor: focused ? color : "transparent" },
                ]}
              />
            </View>
          ),
          title: "",
        }}
        name="card"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIcon}>
              <FontAwesome5 color={color} size={vw(6)} name="user-circle" />
              <View
                style={[
                  styles.Active,
                  { backgroundColor: focused ? color : "transparent" },
                ]}
              />
            </View>
          ),
          title: "",
        }}
        name="profile"
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: "center",
  },
  Active: {
    width: vh(1),
    height: vh(1),
    borderRadius: vh(2),
    marginTop: vh(0.5),
  },
});
