import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const AddFriends = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async (input) => {
    try {
      setUsers([]);
      const { data } = await axios.get(
        `api/v1/user/search-users/${input}`
      );
      console.log(data);
      if (data?.success) {
        setUsers(data?.details);
      }
    } catch (error) {
      console.log(error);
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
        <Text style={style.headerText}>
          Active <Text style={{ color: "red" }}>Aura</Text>{" "}
        </Text>
      </View>
      <View style={style.addfriendPage}>
        <TextInput
          placeholder="Enter Friend Name"
          style={style.textInput}
          onChangeText={getUsers}
          placeholderTextColor={"black"}
        />
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    // borderBottomColor: "lightgray",
    // borderBottomWidth: 1,
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
    padding: 10,
    marginBottom: 20,
  },
});
export default AddFriends;
