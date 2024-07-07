import "react-native-gesture-handler";
import AppNavigator from "./app/navigation/AppNavigator";
import React from "react";
import { AuthProvider } from "./app/contexts/authContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
       <StatusBar backgroundColor="black"  barStyle="light-content" />
      <AppNavigator />
    </AuthProvider>
  );
}
