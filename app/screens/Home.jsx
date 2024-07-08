import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [notification, setNotification] = useState([]);

  const getFriends = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/user/get-friends`);
      setLoading(false);
      setFriends(data?.details);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getNotification = async () => {
    try {
      const { data } = await axios.get(`/api/v1/message/get-notification`);
      setNotification(data?.details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
    getNotification();
  }, []);

  const renderFriend = ({ item }) => {
    const count = notification.filter(n => n.senderId === item.friendId).length;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatScreen", {
            name: item?.friendName,
            id: item.friendId,
          })
        }
      >
        <View style={style.friend_card}>
          <Text style={style.friend_card_text}>
            {item?.friendName} ({count} notifications)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={{ marginLeft: 10 }}>
            <Icon name="bars" size={24} />
          </Text>
        </TouchableOpacity>
        <Text style={style.headerText}>
          Active <Text style={{ color: "red" }}>Aura</Text>{" "}
        </Text>
      </View>
      <View style={style.homePage}>
        {loading ? (
          <View style={style.centered}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : friends.length === 0 ? (
          <View style={style.centered}>
            <Text style={{ fontSize: 18, fontWeight: "900" }}>
              No Friend Found, Add Friends
            </Text>
          </View>
        ) : (
          <FlatList
            data={friends}
            keyExtractor={(item) => item.friendId}
            renderItem={renderFriend}
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 70,
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
    flex: 1,
  },
  friend_card: {
    backgroundColor: "lightgreen",
    paddingVertical: 15,
    borderRadius: 4,
    marginBottom: 3,
  },
  friend_card_text: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
