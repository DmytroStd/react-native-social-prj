import { Camera, CameraType } from "expo-camera";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
// import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import db from "../../firebase/config";

SplashScreen.preventAutoHideAsync();

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [comment, setComment] = useState(null);
  const [location, setLocation] = useState(null);
  // const [coardinate, setCoards] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // console.log(location);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await requestPermission();
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // setCoards(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    // let location = await Location.getCurrentPositionAsync({});
    // setLocation(location);
    // console.log("location", location);

    // console.log("latitude", location.coardinate.latitude);
    // console.log("longitude", location.coardinate.longitude);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db.firestore().collection("posts").add({
      photo,
      comment,
      location,
      // location: location.coords,
      userId,
      login,
    });
    console.log("createPost", createPost);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      await db.storage().ref(`postImage/${uniquePostId}`).put(file);
      const processedPhoto = await db
        .storage()
        .ref("postImage")
        .child(uniquePostId)
        .getDownloadURL();
      // console.log("processedPhoto", processedPhoto);
      return processedPhoto;
    } catch (error) {
      console.log("error.message", error.message);
      console.log("error.code", error.code);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  // if (!permission) {
  //   return <View onLayout={requestPermission}></View>;
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.camContainer}>
          <Camera style={styles.camera} type={type} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            )}

            <TouchableOpacity
              // onPress={toggleCameraType}
              onPress={takePhoto}
              style={styles.buttonContainer}
            >
              <Image
                source={require("../../assets/images/flipIcon.png")}
                style={styles.flipIcon}
              />
            </TouchableOpacity>
          </Camera>
        </View>

        <View>
          {/* <TouchableOpacity onPress={sendPhoto} style={styles.loadBtn}>
            <Text style={styles.loadTitle}>Upload photo</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            // value={state.email}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            // onFocus={() => setIsShowKeyboard(true)}
          />
        </View>
        <View style={styles.geoContainer}>
          <Image
            style={styles.geoIcon}
            source={require("../../assets/images/locationIcon.png")}
          />
          <TextInput
            // value={state.email}
            placeholder="Geo location..."
            placeholderTextColor="#BDBDBD"
            style={styles.geoInput}
            // onFocus={() => setIsShowKeyboard(true)}
          />
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={sendPhoto}
          >
            <Text style={styles.btnText}>Publish</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <Text style={styles.paragraph}>{text}</Text>
        </View> */}
        <View style={styles.trashIconContainet}>
          <Image
            style={styles.trashIcon}
            source={require("../../assets/images/trashIcon.png")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 35,
    backgroundColor: "#fff",
    height: "100%",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  camContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    // height: 200,
    // width: 200,
  },
  photo: {
    borderRadius: 8,
    // height: 200,
    width: Dimensions.get("window").width - 32,
    height: 240,
    // width: 378,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  flipIcon: {
    width: 24,
    height: 24,
  },
  // loadBtn: {
  //   mar,
  // },
  loadTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  inputContainer: {
    height: 50,
    width: Dimensions.get("window").width - 32,
    marginBottom: 32,
    borderBottomWidth: 1.0,
    borderBottomColor: "#BDBDBD",
  },
  input: {
    flex: 1,
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  geoInput: {
    flex: 1,
    height: 50,
    width: Dimensions.get("window").width - 32,
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  geoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.0,
    borderBottomColor: "#BDBDBD",
    marginBottom: 32,
  },
  geoIcon: {
    width: 24,
    height: 24,
    margineRight: 30,
  },
  btnBox: {
    // flex: 1,
    // width: 343,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
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

  trashIconContainet: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  trashIcon: {
    marginLeft: "auto",
    marginRight: "auto",
    // alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
  },
});

// const [fontsLoaded] = useFonts({
//   "Robo-Regular": require("../../assets/fonts/RobotoRegular.ttf"),
//   "Robo-Medium": require("../../assets/fonts/RobotoBold.ttf"),
// });

//fonts
// const onLayoutRootView = useCallback(async () => {
//   if (fontsLoaded)
//     await SplashScreen.hideAsync();
//   }
// }, [fontsLoaded]);

// if (!fontsLoaded) {
//   return null;
// }
