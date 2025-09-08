import { lightTheme } from "@/constants/Colors";
import { vh, vw } from "@/helpers/responsivesizes";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../General/ui/CustomText";
import Avatar from "../General/Avatar/Avatar";

interface props {
  close: () => void;
  setAvatar: (id: number) => void;
  avatar: number;
}

const AvatarPicker = ({ close, avatar, setAvatar }: props) => {
  return (
    <Pressable onPress={close} style={styles.main}>
    <View style={styles.picker}>
      <View style={styles.top}>
        <Pressable onPress={close} style={styles.btn}>
          <FontAwesome name="close" color={lightTheme.gray3} size={vh(2)} />
        </Pressable>
        <CustomText style={{ fontWeight: "500" }} size={vh(2.2)}>
          Select Your Avatar
        </CustomText>
      </View>

      <View style={styles.avatarList}>
          {[0, 1, 2, 3, 4].map((id) => (
            <TouchableOpacity
            key={id}
              onPress={() => {
                setAvatar(id);
                close();
              }}
              style={[styles.avatar, avatar == id && { borderWidth: 2 }]}
            >
              <Avatar size={vh(10)} identifier={id} />
            </TouchableOpacity>
          ))}
        </View>
    </View></Pressable>
  );
};

export default AvatarPicker;

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    zIndex: 60,
    width: vw(100),
    height: vh(100),
    backgroundColor: "rgba(0 , 0 , 0 ,.4)",
    top: 0,
    left: 0,
    justifyContent: "flex-end",
  },
  top: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginVertical: vh(1),
    alignItems: "center",
  },
  btn: {
    width: vh(4),
    height: vh(4),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.gray2,
    borderRadius: vw(2),
    marginRight: vw(2.2),
  },
  picker: {
    height: vh(50),
    backgroundColor: lightTheme.white,
    padding: vw(2),
    alignItems: "center",
    zIndex: 60,
  },
  avatarList: {
    flexDirection: "row",
     flexWrap: "wrap",
     alignSelf: "center",
     width: vw(98),
     marginTop: vh(2),
     gap: vw(2),
     paddingVertical: vh(2),
  },
  avatar: {
    width: (vw(98) - vw(8)) / 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderStyle: "dashed",
    borderColor: lightTheme.primary,
    borderRadius: 1000,
  },
});
