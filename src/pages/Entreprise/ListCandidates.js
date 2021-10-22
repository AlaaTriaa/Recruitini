import React from "react";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AppBar from "../../components/AppBar";
import CandidateCard from "../../components/CandidateCard";
import IconButton from "../../components/IconButton";

export default function RegisterUser({ navigation, route }) {
  const { offer } = route.params;

  function handleNavigationBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <AppBar
        color="#00363a"
        renderLeft={
          <TouchableOpacity onPress={handleNavigationBack}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Offer</Text>
        <Text style={styles.offer}>{offer.jobTitle}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{offer.description}</Text>

        <Text style={styles.label}>Candidates</Text>
        <Text style={styles.candidates}>{offer.acceptedUsers.length}</Text>

        {offer.acceptedUsers.map(({ name, email }) => {
          return (
            <CandidateCard
              key={email}
              name={name}
              onPress={() => navigation.navigate("ViewCandidate", { email })}
            />
          );
        })}
      </ScrollView>
      <IconButton
        backgroundColor="#FFF"
        color="#7f0000"
        justify="center"
        icon={<Feather name="x" size={24} color="#7f0000" />}
        onPress={handleNavigationBack}
      >
        Close Offer
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 24 + Constants.statusBarHeight,
    backgroundColor: "#FFF",
  },
  label: {
    fontWeight: "bold",
    color: "#6C6C80",
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
  },
  offer: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 24,
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
    color: "#333",
  },
  candidates: {
    fontWeight: "bold",
    fontSize: 38,
    marginBottom: 16,
    color: "#e65100",
  },
});
