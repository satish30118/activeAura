import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../contexts/authContext";

const Splash = ({ navigation }) => {
  const [auth] = useAuth()
  useEffect(() => {
    setTimeout(() => {
      if (auth?.token) {
        navigation.navigate("MainScreen");
      } else {
        navigation.navigate("LoginScreen");
      }
    }, 1500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "darkblue",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={require("../assets/img/logo.png")} />
      <Text style={{ fontSize: 30, fontWeight: 800 }}>
        <Text style={{ color: "white" }}>
          Active <Text style={{ color: "red" }}>Aura</Text>
        </Text>
      </Text>
    </View>
  );
};

export default Splash;
