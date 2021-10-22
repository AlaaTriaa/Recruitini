import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import firebase from "../../services/firebase.js";
import { CommonActions } from "@react-navigation/native";

import Input from "../../components/Input";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Expanded from "../../components/AppBar/Expanded.js";
import LoginTab from "../../components/LoginTab";
import IconButton from "../../components/IconButton";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isEnterprise, setIsEnterprise] = useState(false);

  const createButtonAlert = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }], { cancelable: false });
  };

  function sendToCorretRoute() {
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().email == user) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "FindOffer" }],
              })
            );
          }
        });
      })
      .catch(() => {
        console.log("Error failed to find user");
      });

    firebase
      .firestore()
      .collection("Company")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.data().email == user) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "ListOffer" }],
              })
            );
          }
        });
      })
      .catch(() => {
        console.log("Error failed to find company");
      });
  }

  const loginUser = () => {
    if (user == "" || pass == "") {
      return createButtonAlert("Error", "Empty Field!");
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(user, pass)
      .then(() => {
        console.log("Authenticated - Sending to correct route ...");
        return sendToCorretRoute();
      })
      .catch((error) => {
        if (
          error == "auth/wrong-password" ||
          error ==
            "The password is invalid or the user does not have a password."
        ) {
          return createButtonAlert("Error", "Wrong Password!");
        }
        if (error == "auth/invalid-email") {
          return createButtonAlert("Error", "Invalid Email!");
        }
        console.log(error);
        alert(error);
      });
  };

  const registerUser = () => {
    navigation.navigate(isEnterprise ? "RegisterEnterprise" : "RegisterUser");
  };

  return (
    <View style={classes.wrapper}>
      <Expanded isEnterprise={isEnterprise} />
      <LoginTab isEnterprise={isEnterprise} onChange={setIsEnterprise} />

      <View style={classes.loginWrapper}>
        <Input
          label="E-mail"
          placeholder="E-mail"
          keyboardType={"email-address"}
          value={user}
          onChangeText={(text) => setUser(text)}
        />
        <Input
          label="Password"
          onChangeText={(text) => setPass(text)}
          value={pass}
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType={"off"}
        />
      </View>
      <HideWithKeyboard style={classes.actionWrapper}>
        <IconButton
          justify="center"
          backgroundColor={isEnterprise ? "#00363a" : "#bf360c"}
          color="#FFFFFF"
          onPress={loginUser}
        >
          Login
        </IconButton>

        <IconButton
          justify="center"
          backgroundColor="rgba(0,0,0,0)"
          color="#333333"
          onPress={registerUser}
        >
          Register
        </IconButton>
      </HideWithKeyboard>
    </View>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 24,
  },
  loginWrapper: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  actionWrapper: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
});
