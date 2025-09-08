import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../General/ui/CustomText";

export interface props {
  message: string;
  status?: boolean;
}

export const setToastMessage = (
  message: props,
  setToast: React.Dispatch<React.SetStateAction<props>>
) => {
  setToast(message);
  setTimeout(() => setToast({ message: "" }), 3000);
};

const ToastMessage = ({ message, status = false }: props) => {
  useEffect(() => {
    if (!message) {
      top.value = -vh(12);
    } else {
      top.value = 0;
    }
  }, [message]);
  const top = useSharedValue(0);

  const AnimatedStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value),
    };
  });
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={[styles.container, AnimatedStyles]}
    >
      <View style={styles.inner}>
        <View style={styles.alert}>
          <FontAwesome size={vh(2)} color={lightTheme.white} name="warning" />
        </View>
        <CustomText
          style={{ marginLeft: vw(3) }}
          color={lightTheme.Black}
          size={vh(2.2)}
        >
          {message}
        </CustomText>
        <Pressable onPress={() => {top.value = -vh(12)}} style={styles.accent}>
          <FontAwesome color={lightTheme.gray3} size={vh(3)} name="close" />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    height: vh(10),
    display: "none",
    zIndex: 99,
    width: vw(100),
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "90%",
    padding: vh(1),
    backgroundColor: lightTheme.gray1,
    height: vh(7),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: vw(3),
    borderWidth: 1,
    borderColor: lightTheme.gray2,
  },
  accent: {
    height: "95%",
    borderColor: lightTheme.gray2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderRadius: vw(3),
  },

  alert: {
    width: vh(4),
    height: vh(4),
    backgroundColor: "darkred",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
  },
});
