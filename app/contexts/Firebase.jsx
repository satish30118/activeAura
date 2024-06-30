import { View, Text } from "react-native";
import React from "react";
import { firebase } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvXjHgLyLGlPFtDRc-JehtgaWGJe7__88",
  authDomain: "activeaura-88c5a.firebaseapp.com",
  projectId: "activeaura-88c5a",
  storageBucket: "activeaura-88c5a.appspot.com",
  messagingSenderId: "683905108155",
  appId: "1:683905108155:android:73c1223c748f689327819e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default { auth, firebase };
