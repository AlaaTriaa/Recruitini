import React, { useState } from "react";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import firebase, { db } from "../../services/firebase";
import { Feather } from "@expo/vector-icons";

import AppBar from "../../components/AppBar";
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";
import { CommonActions } from "@react-navigation/native";

export default function CreateOffer({ navigation }) {
  const [form, setForm] = useState({
    jobTitle: "",
    payment: "",
    skills: "",
    location: "",
    description: "",
  });

  const createButtonAlert = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }], { cancelable: false });
  };

  const onNavigateBack = () => {
    navigation.goBack();
  };

  const onInput = (field, value) => {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const createNewOffer = () => {
    if (form.jobTitle == "") {
      return createButtonAlert("ERROR", "Field 'Job title' cannot be empty!");
    }

    if (form.skills == "") {
      return createButtonAlert("ERROR", "Field 'Skills' cannot be empty!");
    }
    if (form.description == "") {
      return createButtonAlert("ERROR", "Field 'Description' cannot be empty!");
    }

    db.collection("Offers")
      .add({
        email: firebase.auth().currentUser.email,
        businessName: firebase.auth().currentUser.displayName,
        jobTitle: form.jobTitle,
        location: form.location,
        skills: form.skills,
        description: form.description,
        payment: form.payment,
        refusedUsers: [],
        acceptedUsers: [],
      })
      .then(() => {
        createButtonAlert("Success", "Offer created!");
        return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "ListOffer" }],
          })
        );
      })
      .catch((erro) => {
        return createButtonAlert(
          "Error",
          "Error registering offer in the database."
        );
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar
          color="#00363a"
          renderLeft={
            <TouchableOpacity onPress={onNavigateBack}>
              <Feather name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          }
        />
      </View>
      <Text style={styles.title}>Add an offer</Text>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Input
          label="Job title"
          placeholder="Title"
          onChangeText={(e) => onInput("jobTitle", e)}
        />
        <Input
          label="Payment"
          placeholder="DT 1000"
          onChangeText={(e) => onInput("payment", e)}
        />
        <Text style={styles.observation}>
          Leave blank if price is negotiable.
        </Text>
        <Input
          label="Skills you need ?"
          placeholder="High School degree, Experienced..."
          onChangeText={(e) => onInput("skills", e)}
        />
        <Text style={styles.observation}>Separate skills using(,).</Text>
        <Input
          label="Description"
          multiline={true}
          placeholder="Description"
          onChangeText={(e) => onInput("description", e)}
        />
      </ScrollView>
      <HideWithKeyboard style={styles.footer}>
        <IconButton
          backgroundColor="#00363a"
          color="#FFFFFF"
          fontSize={24}
          justify="center"
          onPress={createNewOffer}
        >
          Create Offer
        </IconButton>
      </HideWithKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  observation: {
    fontSize: 12,
    textAlign: "right",
    color: "#bd2843",
  },
  container: {
    flex: 1,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 8,
    paddingTop: 24 + Constants.statusBarHeight,
  },
  appBar: {
    height: 64,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#00363a",
  },
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
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#333",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00363a",
  },
  groupTitle: {
    marginTop: 24,
    marginBottom: 14,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 18,
    color: "#8F8F8F",
  },
  actions: {
    padding: 24,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tinderButton: {
    width: 54,
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#ADADAD",
  },
  title: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    flex: 1,
    color: "#6C6C80",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 8,
  },
  footer: {
    width: "100%",
    height: 75,
  },
});
