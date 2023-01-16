import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../../firebase/config";
import moment from "moment";

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  const postDate = moment().format("D MMMM, YYYY | h:mm");

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, postDate });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.date}>{item.postDate}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.wrapper}>
        <TextInput
          onChangeText={setComment}
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
          style={styles.sendInput}
        />
        <TouchableOpacity style={styles.sendIconWrap} onPress={createPost}>
          <Image
            style={styles.sendIcon}
            source={require("../../../assets/images/upArrow.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    // alignItems: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 24,
  },
  textContainer: {
    marginLeft: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 6,
  },
  comment: {
    fontFamily: "Robo-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Robo-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 51,
    borderRadius: 100,
  },
  sendInput: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingRight: 8,
  },
  sendIconWrap: {
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
