import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const AddFriends = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async (input) => {
    try {
      setUsers([]);
      setLoading(true);
      const { data } = await axios.get(`api/v1/user/search-users/${input}`);
      setLoading(false);
      console.log(data)
      if (data?.success) {
        setUsers(data?.details);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in add frd: " , error);
    }
  };

  const handleAddFriend = async (name, id) => {
    navigation.navigate("ChatScreen", { name, id });
    try {
      const { data } = await axios.post(`api/v1/user/add-friend`, {
        friendName: name,
        friendId: id,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={{ marginLeft: 10 }}>
            <Icon name="bars" size={23} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Active <Text style={{ color: "red" }}>Aura</Text>{" "}
        </Text>
      </View>
      <View style={styles.addfriendPage}>
        <TextInput
          placeholder="Enter Friend Name"
          style={styles.textInput}
          onChangeText={getUsers}
          placeholderTextColor={"black"}
        />
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : users.length === 0 ? (
          <View style={styles.centered}>
            <Text style={{ fontSize: 18, fontWeight: "900" }}>
              No User Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.foundUser}
                onPress={() => handleAddFriend(item.name, item._id)} // Corrected onPress usage
              >
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 28,
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
  addfriendPage: {
    padding: 10,
    flex: 1,
  },
  textInput: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "darkblue",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  foundUser: {
    backgroundColor: "lightgray",
    padding: 15,
    margin: 2,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 3,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddFriends;
