import "react-native-gesture-handler";
import AppNavigator from "./app/navigation/AppNavigator";
import React from "react";
import { AuthProvider } from "./app/contexts/authContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
