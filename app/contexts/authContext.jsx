import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
// import { EXPO_PUBLIC_APP_API } from "@env";
const EXPO_PUBLIC_APP_API = process.env.EXPO_PUBLIC_APP_API;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const userData = await SecureStore.getItemAsync("authToken");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setAuth({ user: parsedData?.details, token: parsedData?.token });
        }
      } catch (error) {
        console.error("Failed to load the token", error);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      axios.defaults.baseURL = EXPO_PUBLIC_APP_API;
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider, AuthContext };
