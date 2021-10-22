import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Avatar({ children = "" }) {
  return (
    <View>
      <Text style={classes.avatar}>{children}</Text>
    </View>
  );
}

const classes = StyleSheet.create({
  avatar: {
    width: 42,
    height: 42,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#7E7E7E",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "flex-end",
    borderRadius: 42,
  },
});
