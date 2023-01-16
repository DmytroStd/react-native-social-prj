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
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHidden, setisHidden] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
    console.log(state);
    // navigation.navigate("Home");
  };
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

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
              paddingBottom: isShowKeyboard ? 20 : 73,
            }}
          >
            <View style={styles.addAvatar}>
              <Image
                source={require("../../assets/images/add.png")}
                style={styles.addIcon}
              />
            </View>
            <KeyboardAvoidingView>
              <View style={styles.inputWrap}>
                <View>
                  <Text style={styles.title}>Registration</Text>
                </View>

                <View>
                  <TextInput
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
                    }
                    value={state.login}
                    placeholder="Login"
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
            <HideWithKeyboard>
              <View style={styles.btnBox}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.questionText}>
                  Already have an account?{" "}
                  <Text
                    style={styles.linkText}
                    onPress={() => {
                      Keyboard.dismiss();
                      navigation.navigate("Login");
                    }}
                  >
                    Log in
                  </Text>
                </Text>
              </View>
            </HideWithKeyboard>
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
    paddingTop: 92,
  },
  addAvatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIcon: {
    height: 25,
    width: 25,
    position: "absolute",
    top: 87,
    right: -12,
  },
  title: {
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Robo-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  inputWrap: {
    alignItems: "center",
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
