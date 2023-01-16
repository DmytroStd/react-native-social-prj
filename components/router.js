import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import RegistrationScreen from "../screens/auth/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import PostsScreen from "../screens/mainScreen/PostsScreen";
import CreateScreen from "../screens/mainScreen/CreateScreen";
import ProfileScreen from "../screens/mainScreen/ProfileScreen";

import LogOutBtn from "./logOutBtn";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const iconsName = {
  postsIcon: require("../assets/images/posts.png"),
  addPostIcon: require("../assets/images/addPostIcon.png"),
  profileIcon: require("../assets/images/profileIcon.png"),
};
// const images = {
//   logout: require("../assets/images/log-out.png"),
// };

// export default function useRoute(isAuth, { navigation }) {
export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            display: "flex",
            height: 83,
          },
          null,
        ],
      }}
    >
      <MainTab.Screen
        name="Home"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../assets/images/posts.png")}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Image
              style={{ width: 70, height: 40, borderRadius: 20 }}
              source={require("../assets/images/addPostIcon.png")}
            />
          ),
          headerShown: true,
          title: "Create post",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              // onPress={() => navigation.navigate("DefaultScreen")}
              style={styles.goBack}
            >
              <Image source={require("../assets/images/arrow-left.png")} />
            </TouchableOpacity>
          ),
        }}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../assets/images/profileIcon.png")}
            />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
  goBack: {
    paddingLeft: 16,
  },
});
