import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Warning({ icon, title = "", message = "" }) {
  return (
    <View style={classes.wrapper}>
      {icon}
      <Text style={classes.title}>{title}</Text>
      <Text style={classes.message}>{message}</Text>
    </View>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  message: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#333",
  },
});
