import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SkillBadge({ icon, children }) {
  return (
    <View style={styles.wrapper}>
      {icon}
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 8,
    padding: 14,
    minWidth: 100,
    height: 38,
    flexDirection: "row",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ffd740",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    marginHorizontal: 8,
    fontSize: 14,
  },
});
