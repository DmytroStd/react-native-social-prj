import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../../../firebase/config";

const images = {
  commentIcon: require("../../../assets/images/commentIcon.png"),
  geoIcon: require("../../../assets/images/locationIcon.png"),
};

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
            <View style={{ paddingTop: 8, paddingBottom: 11 }}>
              <Text style={styles.text}>{item.comment}</Text>
            </View>
            <View style={styles.infoWrap}>
              <View style={styles.commentsIconWrap}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", { postId: item.id })
                  }
                  style={styles.commentIcon}
                >
                  <Image source={images.commentIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.geoIconWrap}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                  style={styles.geoIcon}
                >
                  <Image source={images.geoIcon} />
                </TouchableOpacity>
                {/* <TextInput
                  placeholder="Geo location..."
                  placeholderTextColor="#BDBDBD"
                  style={styles.geoInput}
                /> */}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    overflow: "hidden",
    // borderRadius: 8,
    backgroundColor: "#fff",
    paddingTop: 32,
    // marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  infoWrap: {
    flex: 1,
    flexDirection: "row",

    // justifyContent: "space-evenly",
  },
  text: {
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentsIconWrap: {
    marginRight: 76,
  },
  geoInput: {
    flex: 1,
    height: 50,
    width: 92,
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  geoIconWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1.0,
    // borderBottomColor: "#BDBDBD",
    // marginBottom: 32,
  },
  geoIcon: {
    width: 24,
    height: 24,
    margineRight: 30,
  },
});
