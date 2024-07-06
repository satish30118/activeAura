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
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user/get-friends`);
      setLoading(false);
      alert(data?.message);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity>
          <Text>
            <Icon name="user" size={23} />
          </Text>
        </TouchableOpacity>
        <Text style={style.headerText}>
          Active <Text style={{ color: "red" }}>Aura</Text>{" "}
        </Text>
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
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "blue",
    textTransform: "uppercase",
    marginLeft: 70,
  },
  homePage: {
    padding: 10,
  },
});

export default Home;
