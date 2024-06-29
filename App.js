import "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
