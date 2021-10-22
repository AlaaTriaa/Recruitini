import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function LoginTab({ isEnterprise, onChange }) {
  return (
    <View style={classes.wrapper}>
      <TouchableOpacity
        style={[
          classes.pillLeft,
          { backgroundColor: isEnterprise ? "#7E7E7E" : "#bf360c" },
        ]}
        onPress={() => onChange(false)}
      >
        <Text style={classes.pillText}>
          {"     "}Worker {"     "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          classes.pillRight,
          { backgroundColor: isEnterprise ? "#00363a" : "#7E7E7E" },
        ]}
        onPress={() => onChange(true)}
      >
        <Text style={classes.pillText}>
          {" "}
          {"     "}Company{"     "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  pillLeft: {
    maxWidth: "50%",
    backgroundColor: "#7E7E7E",
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  pillRight: {
    maxWidth: "50%",
    backgroundColor: "#7E7E7E",
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  pillText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
