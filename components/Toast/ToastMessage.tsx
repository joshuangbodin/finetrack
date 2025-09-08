import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeInDown,
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
  const top = useSharedValue(-vh(12));

  useEffect(() => {
    if (!message) {
      top.value = withTiming(-vh(12));
    } else {
      top.value = withTiming(vh(3)); // slide down slightly below top
    }
  }, [message]);

  const AnimatedStyles = useAnimatedStyle(() => ({
    top: top.value,
  }));

  const icon = status
    ? { name: "check-circle", color: "seagreen" }
    : { name: "times-circle", color: "crimson" };

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={[styles.container, AnimatedStyles]}
    >
      <View style={styles.inner}>
        {/* Left icon */}
        <FontAwesome
          size={vh(3)}
          color={icon.color}
          name={icon.name as any}
          style={{ marginRight: vw(3) }}
        />

        {/* Message text */}
        <View style={{ flex: 1 }}>
          <CustomText size={vh(2)} color={lightTheme.Black}  style={{fontWeight:"600"}}>
            {status? "Success" : "Failed"}
          </CustomText>
          <CustomText size={vh(1.7)} color={lightTheme.gray3} numberOfLines={2}>
            {message}
          </CustomText>
        </View>

        {/* Close button */}
        <Pressable
          onPress={() => (top.value = withTiming(-vh(12)))}
          style={styles.accent}
        >
          <FontAwesome color={lightTheme.gray3} size={vh(2.5)} name="close" />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 99,
    alignItems: "center",
    paddingHorizontal: vw(4),
  },

  inner: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: vh(8),
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.5),
    borderRadius: vw(4),
    backgroundColor: "rgba(255,255,255,0.95)", // iOS-style frosted look
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  accent: {
    padding: vw(2),
    marginLeft: vw(2),
    justifyContent: "center",
    alignItems: "center",
  },
});
