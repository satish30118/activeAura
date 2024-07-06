import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../contexts/authContext";

const Login = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const sendData = async () => {
    try {
      if (!password || !mobile) {
        return alert("Mobile Number and Password Required.");
      }
      setLoading(true);
      const { data } = await axios.post(`api/v1/auth/login`, {
        password,
        mobile,
      });

      setLoading(false);
      alert(data.message);

      if (data?.success) {
        navigation.navigate("MainScreen");

        // Store token securely
        await SecureStore.setItemAsync("authToken", data?.token);
        setAuth({ ...auth, token: data?.token });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>
        Account <Text style={{ color: "red" }}>Login</Text>
      </Text>
      <TextInput
        placeholder="Enter Mobile No."
        style={style.textInput}
        keyboardType="numeric"
        placeholderTextColor={"lightgrey"}
        onChangeText={setMobile}
      />
      <TextInput
        placeholder="Enter Password"
        style={style.textInput}
        placeholderTextColor={"lightgrey"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={style.button} onPress={sendData}>
        <Text style={style.buttonText}>
          {loading ? <ActivityIndicator size={"large"} /> : "Login"}
        </Text>
      </TouchableOpacity>

      <View style={{ justifyContent: "center", marginVertical: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Have not an Account{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 6,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#023E8A",
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "lightgray",
    color: "white",
    width: "80%",
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#841584",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default Login;
