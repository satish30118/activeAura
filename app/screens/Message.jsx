import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const Message = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async (e) => {
    try {
      setUsers([]);
      const { data } = await axios.get(
        `api/v1/user/search-user/${e.target.value}`
      );
      console.log(data)
      if (data?.success) {
        setUsers(data?.details);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={style.container}>
      <TextInput
        placeholder="Enter Friend Name"
        style={style.textInput}
        onChange={getUsers}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 28,
    backgroundColor: "lightgray",
    flex: 1,
    padding: 10,
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
export default Message;
