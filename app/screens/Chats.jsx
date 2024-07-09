import React, { useState, useEffect, useRef } from "react";
import { EXPO_PUBLIC_APP_API } from "@env";
// const EXPO_PUBLIC_APP_API = process.env.EXPO_PUBLIC_APP_API;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

let socket;
const Chats = ({ navigation, route }) => {
  const [auth] = useAuth();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name, id } = route.params;
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchChats();
    socket = io(EXPO_PUBLIC_APP_API, {
      transports: ["websocket"],
      jsonp: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      pingTimeout: 60000, // Increase timeout
      pingInterval: 25000, // Set ping interval
    });
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.emit("join", auth?.user?._id);

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("receiveMessage", (newMessage) => {
      setChats((prevChats) => [...prevChats, newMessage]);
      console.log("Received message: ", newMessage);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/message/get-message/${id}`);
      setChats(data.details);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("sendMessage", {
      senderId: auth?.user?._id,
      receiverId: id,
      content: message,
    });

    // setChats((prevChats) => [
    //   ...prevChats,
    //   {
    //     _id: Date.now(),
    //     senderId: auth?.user?._id,
    //     receiverId: id,
    //     content: message,
    //   },
    // ]);
    setMessage("");
  };
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

  const renderChatItem = ({ item }) => (
    <View
      style={[
        styles.chatBubble,
        {
          alignSelf:
            item.senderId === auth?.user?._id ? "flex-end" : "flex-start",
          backgroundColor:
            item.senderId === auth?.user?._id ? "#b2e5ff" : "lightgreen",
        },
      ]}
    >
      <Text style={styles.chatText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Chatting With <Text style={{ color: "red" }}>{name}</Text>
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size={"large"}/>
      ) : (
        <FlatList
          ref={flatListRef}
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.chatContainer}
        />
      )}

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
