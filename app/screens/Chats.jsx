import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/FontAwesome";

const socket = io("YOUR_SOCKET_SERVER_URL");

const Chats = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { name, id } = route.params;

  useEffect(() => {
    // Fetch initial chats from backend or socket server
    fetchChats();

    // Listen for new messages from socket server
    socket.on("newMessage", (newMessage) => {
      setChats((prevChats) => [...prevChats, newMessage]);
    });

    return () => {
      socket.disconnect(); // Clean up socket connection
    };
  }, []);

  const fetchChats = () => {
    // Replace with actual API call to fetch chats from backend
    const fakeChats = [
      { id: 1, sender: "user", message: "Hello there!" },
      { id: 2, sender: "other", message: "Hi, how are you?" },
      { id: 3, sender: "user", message: "I'm good, thanks!" },
    ];
    setChats(fakeChats);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    // Emit message to socket server
    socket.emit("sendMessage", { sender: "user", message });

    // Update local UI
    setChats((prevChats) => [
      ...prevChats,
      { id: prevChats.length + 1, sender: "user", message },
    ]);

    // Clear message input
    setMessage("");
  };

  const renderChatItem = ({ item }) => (
    <View
      style={[
        styles.chatBubble,
        {
          alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
          backgroundColor: item.sender === "user" ? "#b2e5ff" : "#e5e5e5",
        },
      ]}
    >
      <Text style={styles.chatText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Chatting With <Text style={{ color: "red" }}>{name}</Text>
        </Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            style={styles.input}
            placeholderTextColor="black"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Icon name="send" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    // marginTop: 28,
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
  chatContainer: {
    padding: 10,
    flexGrow: 1,
  },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  chatText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
  },
});

export default Chats;
