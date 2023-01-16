import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";
import LogOutBtn from "../../assets/images/log-out.png";

const images = {
  logout: require("../../assets/images/log-out.png"),
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require("../../assets/images/image.png")}
      >
        <View style={styles.form}>
          <View style={styles.addAvatar}>
            <Image
              source={require("../../assets/images/add.png")}
              style={styles.addIcon}
            />
          </View>
          {/* <LogOutBtn /> */}
          <View onPress={signOut}>
            <TouchableOpacity onPress={signOut} style={styles.logOut}>
              <Image onPress={signOut} source={images.logout} />
            </TouchableOpacity>
          </View>
          <Text>{userPosts.login}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  // marginVertical: 17,
                  marginHorizontal: 16,
                  marginBottom: 32,
                }}
              >
                <Image source={{ uri: item.photo }} style={{ height: 240 }} />
              </View>
            )}
          />
          {/* <Button
            title="signOut"
            type="clear"
            onPress={signOut}
            // style={styles.logOutBtn}
            // icon={<Image source={images.logout} onPress={signOut} />}
          /> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingTop: 92,
  },
  form: {
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    height: "80%",
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingTop: 62,
  },
  addAvatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    paddingTop: 32,
  },
  addIcon: {
    height: 25,
    width: 25,
    position: "absolute",
    top: 87,
    right: -12,
  },
  logOut: {
    // position: "absolute",
    alignItems: "flex-end",
    // padding: 10,
    top: 28,
  },
  logOutBtn: {
    backgroundColor: "#FF6C00",
    marginTop: 27,
    height: 51,
    // width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF6C00",
    marginHorizontal: 50,
  },
});
