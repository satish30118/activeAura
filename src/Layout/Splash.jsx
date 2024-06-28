import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('main');
    }, 3000);
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
      <Image source={require("../assets/img/logo.png")}/>
      <Text style={{ fontSize: 30, fontWeight: 800 }}>
        <Text style={{ color: "white" }}>
          Active <Text style={{ color: "red" }}>Aura</Text>
        </Text>
      </Text>
    </View>
  );
};

export default Splash;
