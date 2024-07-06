import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../contexts/authContext";

const Register = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    try {
      if (!password || !mobile) {
        return alert(`Name, Mobile Number and Password Required.`);
      }
      if (password !== cpassword) {
        return alert(`Password and Confirm Password not matched.`);
      }
      setLoading(true);
      const { data } = await axios.post(`/api/v1/auth/register`, {
        password,
        mobile,
        name,
      });
      setLoading(false);
      alert(data.message);
      // console.log(data)
      await SecureStore.getItemAsync("authToken", data?.token);
      setAuth({ ...auth, token: data?.token });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>
        Create <Text style={{ color: "red" }}>Account</Text>
      </Text>
      <TextInput
        placeholder="Enter Name"
        style={style.textInput}
        keyboardType="text"
        placeholderTextColor={"lightgrey"}
        onChangeText={setName}
      />
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
      <TextInput
        placeholder="Enter Confirm Password"
        style={style.textInput}
        placeholderTextColor={"lightgrey"}
        secureTextEntry={true}
        onChangeText={setCPassword}
      />
      <TouchableOpacity style={style.button} onPress={sendData}>
        <Text style={style.buttonText}>
          {loading ? <ActivityIndicator size={"large"} /> : "Register"}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          marginVertical: 20,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Have an Account{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
            Login
          </Text>
        </TouchableOpacity>
      </Text>
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

export default Register;
