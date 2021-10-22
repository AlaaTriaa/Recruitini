import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import firebase, { db } from "../../services/firebase";
import { Feather } from "@expo/vector-icons";

import AppBar from "../../components/AppBar";
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";

export default function RegisterEnterprise() {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    password: "",
    location: "",
    businessType: "",
  });

  const navigation = useNavigation();

  const onNavigateBack = () => {
    navigation.goBack();
  };

  const onInput = (field, value) => {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const createButtonAlert = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }], { cancelable: false });
  };

  const onRegistry = () => {
    setIsLoading(true);
    if (form.businessName == "") {
      setIsLoading(false);
      return createButtonAlert("Error", "The field business name is empty!");
    }
    if (form.email == "") {
      setIsLoading(false);
      return createButtonAlert("Error", "The field email is empty!");
    }
    if (form.password == "" || form.password.length < 6) {
      setIsLoading(false);
      return createButtonAlert(
        "ERRO",
        "The field password is empty or has less than 6 characters!"
      );
    }
    if (form.businessType == "") {
      setIsLoading(false);
      return createButtonAlert("ERRO", "The field business type is empty!");
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((authUser) => {
        var user2 = firebase.auth().currentUser;
        if (user2 != null) {
          user2
            .updateProfile({
              displayName: form.businessName,
            })
            .then(function () {
              db.collection("Company")
                .add({
                  email: form.email,
                  businessName: form.businessName,
                  businessType: form.businessType,
                  location: form.location,
                })
                .then(() => {
                  createButtonAlert("Sucess", "Registration Sucessful!!");
                  return navigation.navigate("Login");
                })
                .catch((erro) => {
                  setIsLoading(false);
                  return createButtonAlert("Error", "Error on user registry!");
                });
            });
        } else {
          alert("Registration Sucessful!");
          return navigation.navigate("Login");
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setIsLoading(false);
          return createButtonAlert(
            "ERROR",
            "This email address is already in use!"
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
    <View style={styles.container}>
      <AppBar
        color="#00363a"
        renderLeft={
          <TouchableOpacity onPress={onNavigateBack}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      <Text style={styles.title}>Register your business</Text>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Input
          label="Business Name"
          placeholder="Company"
          onChangeText={(e) => onInput("businessName", e)}
        />
        <Input
          label="E-mail"
          keyboardType={"email-address"}
          placeholder="Company@domain.tn"
          onChangeText={(e) => onInput("email", e)}
        />
        <Input
          label="Password"
          placeholder="•••••••••"
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
          label="What is your business?"
          placeholder="TIC , Medical , Marketing ..."
          onChangeText={(e) => onInput("businessType", e)}
        />
      </ScrollView>
      <HideWithKeyboard style={styles.footer}>
        <IconButton
          backgroundColor="#00363a"
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
  container: {
    flex: 1,
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 8,
    paddingTop: 24 + Constants.statusBarHeight,
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
