import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AppBar({ color = "#bf360c", renderLeft, renderRight }) {
  return (
    <View style={classes.wrapper}>
      <View style={classes.side}>{renderLeft}</View>
      <Text style={[classes.title, { color }]}>Recruitini</Text>
      <View style={classes.side}>{renderRight}</View>
    </View>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  side: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
