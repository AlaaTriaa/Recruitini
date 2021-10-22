import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import AppBar from "../../components/AppBar";
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";

import firebase, { db } from "../../services/firebase";

export default function RegisterUser() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    location: "",
    skills: "",
  });

  const onInput = (field, value) => {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const onNavigateBack = () => {
    navigation.goBack();
  };

  const createButtonAlert = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }], { cancelable: false });
  };

  const onRegistry = () => {
    setIsLoading(true);

    if (form.fullName == "") {
      setIsLoading(false);
      return createButtonAlert("ERROR ", " The name field must be filled");
    }

    if (form.email == "") {
      setIsLoading(false);
      return createButtonAlert(
        "Error",
        "The email field must be completed and valid"
      );
    }

    if (form.password == "" || form.password.length < 6) {
      setIsLoading(false);
      return createButtonAlert(
        "Error",
        "The password field must be filled out and have at least 6 characters!"
      );
    }
    if (form.phone == "") {
      setIsLoading(false);
      return createButtonAlert("Error", "The phone field must be filled");
    }
    if (form.skills == "") {
      setIsLoading(false);
      return createButtonAlert("Error", "the skills field must be filled");
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((authUser) => {
        var user2 = firebase.auth().currentUser;
        if (user2 != null) {
          user2
            .updateProfile({
              displayName: form.fullName,
            })
            .then(function () {
              db.collection("Users")
                .add({
                  email: form.email,
                  fullName: form.fullName,
                  phone: form.phone,
                  location: form.location,
                  skills: form.skills,
                })
                .then(() => {
                  createButtonAlert("Success", "Registration Successful!!");
                  return navigation.navigate("Login");
                })
                .catch((erro) => {
                  setIsLoading(false);
                  return createButtonAlert(
                    "Error",
                    "Error when registering user in the database."
                  );
                });
            });
        } else {
          alert("Registration Successful!");
          return navigation.navigate("Login");
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setIsLoading(false);
          return createButtonAlert(
            "ERROR",
            "That email address is already in use!"
          );
        }

        if (error.code === "auth/invalid-email") {
          setIsLoading(false);
          return createButtonAlert("ERROR", "That email address is invalid!");
        }

        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.wrapper}>
      <AppBar
        renderLeft={
          <TouchableOpacity onPress={onNavigateBack}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      <Text style={styles.title}>Create new account</Text>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Input
          label="Name"
          placeholder="Your name"
          onChangeText={(e) => onInput("fullName", e)}
        />
        <Input
          label="Phone (+216)"
          keyboardType="phone-pad"
          placeholder="+216 - - - - - - - -"
          onChangeText={(e) => onInput("phone", e)}
        />
        <Input
          label="E-mail"
          keyboardType="email-address"
          placeholder="E-mail"
          autoCorrect={false}
          onChangeText={(e) => onInput("email", e)}
        />
        <Input
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => onInput("password", e)}
        />
        <Input
          icon={<Feather name="map-pin" size={24} color="#333333" />}
          label="Location"
          placeholder="Sousse,Tunis..."
          onChangeText={(e) => onInput("location", e)}
        />

        <Input
          label="Skills"
          placeholder="Software Developer , ICT engineer ..."
          onChangeText={(e) => onInput("skills", e)}
        />
        <Text style={styles.observation}></Text>
      </ScrollView>
      <HideWithKeyboard style={styles.footer}>
        <IconButton
          backgroundColor="#bf360c"
          color="#FFFFFF"
          fontSize={24}
          justify="center"
          onPress={onRegistry}
        >
          Register
        </IconButton>
      </HideWithKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 8,
    paddingTop: 24 + Constants.statusBarHeight,
  },
  observation: {
    fontSize: 12,
    textAlign: "right",
    color: "#bd2843",
  },
  title: {
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
