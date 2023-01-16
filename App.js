import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/main";

export default function App() {
  ///////////////////////////////////////
  // authorize
  // const routing = useRoute(true);
  // not authenticated
  // const routing = useRoute(false);
  /////////////////////////////////////////

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

/// СПРОСИТЬ
// import { Dimensions } from "react-native";

// import * as Font from "expo-font";
// import { AppLoading } from "expo";

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// useEffect(() => {
//   const onChange = () => {
//     const width = Dimensions.get("window").width;
//   };
//   Dimensions.addEventListener("change", onChange);
//   return () => {
//     Dimensions.removeEventListener("change", onChange);
//   };
// }, []);
