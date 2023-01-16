import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHidden, setisHidden] = useState(true);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    // console.log(state);
    setState(initialState);
    // navigation.navigate("Home");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../../assets/fonts/RobotoRegular.ttf"),
    "Robo-Medium": require("../../assets/fonts/RobotoBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require("../../assets/images/image.png")}
        >
          <View
            onLayout={onLayoutRootView}
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 32 : 132,
            }}
          >
            <KeyboardAvoidingView
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            // style={styles.container}
            >
              <View style={styles.inputWrap}>
                <Text style={styles.title}>Log In</Text>

                <View>
                  <TextInput
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    value={state.email}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    style={styles.input}
                    onFocus={() => setIsShowKeyboard(true)}
                  />
                </View>
                <View>
                  <TextInput
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    value={state.password}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isHidden}
                    style={{ ...styles.input, marginBottom: 43 }}
                    onFocus={() => setIsShowKeyboard(true)}
                  />
                  <TouchableOpacity
                    style={styles.viewPassword}
                    onPress={() => {
                      setisHidden(!isHidden);
                    }}
                  >
                    {isHidden ? (
                      <Text style={styles.viewPasswordTitle}>Show</Text>
                    ) : (
                      <Text style={styles.viewPasswordTitle}>Hide</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.questionText}>
                Don't have an account?{" "}
                <Text
                  style={styles.linkText}
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate("Registration");
                  }}
                >
                  Registration
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingTop: 32,
  },
  inputWrap: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Robo-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  input: {
    width: 343,
    padding: 16,
    height: 50,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnBox: {
    // flex: 1,
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,

    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Robo-Regular",
  },
  questionText: {
    textAlign: "center",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  linkText: {
    textAlign: "center",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    color: "#0047AB",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  viewPassword: {
    height: 50,
    position: "absolute",
    right: 16,
  },
  viewPasswordTitle: {
    color: "#1B4371",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    marginTop: "auto",
    marginBottom: "auto",
  },
});
