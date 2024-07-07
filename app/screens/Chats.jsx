import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Chats = () => {
  const [message, setMessage] = useState("");
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerText}>
          Chatting With <Text style={{ color: "red" }}>Aura</Text>{" "}
        </Text>
      </View>

      <View>
        <TextInput
          placeholder="message..."
          onChangeText={setMessage}
          style={style.msgInput}
          placeholderTextColor={"black"}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 28,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 70,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "blue",
    textTransform: "uppercase",
  },
  chatsPage: {
    padding: 10,
  },
  chatsHistory: {},
  msgInput: {
    borderWidth: 1,
    height: 30,
    padding: 10,
    width: "80%",
  },
});

export default Chats;
