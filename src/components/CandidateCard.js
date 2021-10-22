import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CandidateCard({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.icon}>
        <Feather name="chevron-right" color="#000" size={24} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
    height: 60,
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  text: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
