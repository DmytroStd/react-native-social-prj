import React from "react";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const images = {
  logout: require("../../assets/images/log-out.png"),
  goBack: require("../../assets/images/arrow-left.png"),
};

export default function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={signOut} style={styles.logOut}>
              <Image onPress={signOut} source={images.logout} />
            </TouchableOpacity>
          ),
          title: "Posts",
          headerTitleAlign: "center",
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          title: "Comments",
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultScreen")}
              style={styles.goBack}
            >
              <Image source={images.goBack} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          title: "Map",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultScreen")}
              style={styles.goBack}
            >
              <Image source={images.goBack} />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  goBack: {
    paddingLeft: 16,
  },
  logOut: {
    paddingRight: 16,
  },
});
