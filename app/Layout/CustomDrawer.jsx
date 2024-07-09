// CustomDrawerContent.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerActions,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../contexts/authContext";
import * as SecureStore from "expo-secure-store";

export default function CustomDrawerContent(props) {
  const [auth, setAuth] = useAuth();
  const shareApp = async () => {
    props.navigation.closeDrawer();
    try {
      const result = await Share.share({
        message: "Check out this awesome chat app! Active Aura, https://drive.google.com/drive/folders/1r_1QPlAmetdjb9XEDPkJeRs6hvmfyZay?usp=drive_link, https://expo.dev/artifacts/eas/6qwSZA96K7Du2knNB8pEHC.apk",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openSMSForReview = () => {
    props.navigation.closeDrawer();
    Linking.openURL("sms:+917985017186?body=Write your review here...");
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      setAuth({ token: "", user: null });
      props.navigation.closeDrawer();
      props.navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.header}>
        <View style={styles.userAvtar}>
          {/* <Icon name="user" size={65} color="#000" /> */}
          <Image
            source={require("../assets/img/profilepic.jpg")}
            style={{ height: 70, width: 70, borderRadius:50 }}
          />
        </View>
        <Text style={styles.headerText}>{auth?.user?.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          alert("Coming soon");
          props.navigation.closeDrawer();
        }}
      >
        <Icon name="gear" size={20} color="#000" />
        <Text style={styles.itemText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={shareApp}>
        <Icon name="share-alt" size={20} color="#000" />
        <Text style={styles.itemText}>Share App</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={openSMSForReview}>
        <Icon name="star" size={20} color="#000" />
        <Text style={styles.itemText}>Review</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          alert("Coming soon..");
          props.navigation.closeDrawer();
        }}
      >
        <Icon name="lock" size={20} color="#000" />
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Icon name="sign-out" size={20} color="#000" />
        <Text style={styles.itemText}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  itemText: {
    marginLeft: 20,
    fontSize: 16,
  },
  userAvtar: {
    margin: "auto",
    borderWidth: 4,
    borderRadius: 100,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
