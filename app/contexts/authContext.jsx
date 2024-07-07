import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import { APP_API } from "@env";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "myself token" });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const userData = await SecureStore.getItemAsync("authToken");
        if (userData) {
          setAuth({ user: userData?.details, token: userData?.token });
        }
      } catch (error) {
        console.error("Failed to load the token", error);
      }
    };
    loadToken();
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      axios.defaults.baseURL = APP_API;
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
