import { lightTheme } from "@/constants/Colors";
import { vw } from "@/helpers/responsivesizes";
import React from "react";
import { Image, StyleSheet } from "react-native";

interface props {
  identifier?: number;
  size?: number;
}

const avatar_list = [
  require("@/assets/images/avatar/default.jpg"),
  require("@/assets/images/avatar/avatar1.jpg"),
  require("@/assets/images/avatar/avatar2.jpg"),
  require("@/assets/images/avatar/avatar3.jpg"),
  require("@/assets/images/avatar/avatar4.jpg"),
];

const Avatar = ({ identifier = 0, size }: props) => {
  return (
    <Image
      style={[styles.image, { width: size, height: size }]}
      resizeMode="cover"
      source={avatar_list[identifier]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {
    width: vw(40),
    height: vw(40),
    backgroundColor: lightTheme.gray1,
    borderRadius: 1000,
  },
});
