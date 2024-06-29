import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { APP_API } from "@env";

const PostCard = ({ data }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  return (
    <View style={style.pCard}>
      <View style={style.pUser}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/img/logo.jpg")}
            style={style.pUserImg}
          />
          <Text style={{ paddingLeft: 10, color: "darkblue", fontWeight: 700 }}>
            {data?.name}
          </Text>
        </View>
        <View>
          <Text style={{ color: "red", fontWeight: 700 }}>Follow</Text>
        </View>
      </View>

      <View>
        <Text style={style.postDescription}>{data?.description}</Text>
      </View>
      <View>
        <Text style={style.postDate}>
          Posted : {data?.createdAt.split("T")[0]}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  pCard: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1.6,
    borderColor: "grey",
    marginVertical: 5,
  },
  pUser: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    height: 35,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  pUserImg: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "grey",
  },
  postDescription: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  postDate: {
    padding: 2,
    fontWeight: "bold",
    color:"grey"
  },
});

export default PostCard;
