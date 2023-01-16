import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

const images = {
  logout: require("../assets/images/log-out.png"),
};

export default function LogOutBtn() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <TouchableOpacity
      // activeOpacity={0.6}
      onPress={signOut}
      style={styles.logout}
    >
      <Image source={images.logout} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
});
