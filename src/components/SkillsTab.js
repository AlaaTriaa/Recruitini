import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function SkillsTab({ skills = "" }) {
  return (
    <View style={classes.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {skills.split(",").map((skill) => {
          return (
            <View style={classes.skills}>
              <Feather name="check" color="#fff" size={20} />
              <Text style={classes.text}>{skill}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 14,
  },
  skills: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 24,
  },
  text: {
    marginLeft: 16,
    color: "#ffffff",
    textTransform: "capitalize",
  },
});
