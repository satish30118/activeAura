import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { APP_API } from "@env";
import axios from "axios";
import PostCard from "../compenents/PostCard";
import { auth } from "../contexts/Firebase";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const getPost = async () => {
    try {
      const { data } = await axios.get(`api/v1/post/getposts`);
      setPosts(data?.details);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  const signIn = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity>
          <Text>
            <Icon name="user" size={23} />
          </Text>
        </TouchableOpacity>
        <Text style={style.headerText}>Public Posts</Text>
      </View>
      {/* <ScrollView style={style.homePage}>
        <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard data={item} />
        )}
      />
        <PostCard />
      </ScrollView> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 26,
    backgroundColor: "lightgray",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "blue",
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "grey",
    textTransform: "uppercase",
    marginLeft: 70,
  },
  homePage: {
    padding: 10,
  },
});

export default Home;
