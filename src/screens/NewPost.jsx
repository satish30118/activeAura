import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    try {
      if (!description) {
        alert("Enter Something");
        return;
      }
      setLoading(true);
      const { data } = await axios.post(`api/v1/post/addpost`, {description});
      setLoading(false);
      if (data?.success) {
        alert("Post added successfully");
        return;
      }
      alert("Post can't added");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Post can't added");
    }
  };
  return (
    <View style={style.newPost}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
          <Text>Adding Post</Text>
        </View>
      ) : (
        <View>
          <View>
            <Text style={style.newPostHeader}>NEW POST</Text>
            <TextInput
              style={style.newPostInput}
              onChange={setDescription}
              value={description}
              multiline
              placeholder="Enter What is in your mind ..."
            />
          </View>
          <View>
            <Button
              title="Post"
              style={style.newPostbtn}
              onPress={handlePost}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  newPost: {
    marginTop: 28,
    backgroundColor: "lightgray",
    flex: 1,
    padding: 10,
  },
  newPostInput: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  newPostHeader: {
    backgroundColor: "gray",
    padding: 9,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  newPostbtn: {
    marginTop: 30,
  },
});

export default NewPost;
