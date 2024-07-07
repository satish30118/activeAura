// CustomDrawerContent.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";

const shareApp = async () => {
  try {
    const result = await Share.share({
      message: "Check out this awesome app! [Your App Link Here]",
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
  Linking.openURL("sms:7985017186?body=Write your review here...");
};

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.header}>
        <View style={styles.userAvtar}>
          <Icon name="user" size={65} color="#000" />
        </View>
        <Text style={styles.headerText}>Satish Maurya</Text>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => alert("comming soon")}
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
          alert("Comming soon..");
        }}
      >
        <Icon name="lock" size={20} color="#000" />
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          alert("Comming soon..");
        }}
      >
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
