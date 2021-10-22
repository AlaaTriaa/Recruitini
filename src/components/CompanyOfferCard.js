import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CompanyOfferCard({
  onPress = () => {},
  title = "",
  candidatesNumber = 0,
}) {
  return (
    <TouchableOpacity style={classes.wrapper} onPress={onPress}>
      <Text style={classes.title}>{title}</Text>
      <Text style={classes.subtitle}>
        candidates: <Text style={classes.value}>{candidatesNumber}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 64,
    padding: 14,
    marginVertical: 8,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e65100",
  },
});
