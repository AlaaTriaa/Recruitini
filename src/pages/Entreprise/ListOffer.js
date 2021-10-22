import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import firebase, { db } from "../../services/firebase.js";
import { CommonActions } from "@react-navigation/native";

import AppBar from "../../components/AppBar";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CompanyOfferCard from "../../components/CompanyOfferCard";
import Warning from "../../components/Warning";

export default function ListOffer({ navigation }) {
  const [myOffers, setMyOffers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    db.collection("Offers")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then((querySnapshot) => {
        let offers = [];
        querySnapshot.forEach((documentSnapshot) => {
          offers.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        setMyOffers(offers);
      });
  }, [reload]);

  const logoutAlert = (title, msg) =>
    Alert.alert(
      title,
      msg,
      [{ text: "Yes", onPress: () => doLogout() }, { text: "Cancel" }],
      { cancelable: true }
    );

  const doLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      });
  };

  return (
    <View style={classes.container}>
      <AppBar
        color="#00363a"
        renderLeft={
          <TouchableOpacity
            onPress={() => logoutAlert("Confirm", "Do you want to log out??")}
          >
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        }
        renderRight={
          <TouchableOpacity onPress={() => setReload(!reload)}>
            <Feather name="refresh-cw" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      {/* List */}
      <Text style={classes.title}>Your offers</Text>
      {myOffers.length == 0 ? (
        <Warning
          icon={<Feather name="alert-triangle" size={34} color="##b71c1c" />}
          title="You don't have offers yet!"
          message="Click below to create a new job offer!"
        />
      ) : (
        myOffers.map((offer) => {
          return (
            <CompanyOfferCard
              key={offer.id}
              title={offer.jobTitle}
              candidatesNumber={offer.acceptedUsers.length}
              onPress={() => navigation.navigate("ListCandidates", { offer })}
            />
          );
        })
      )}
      {/* Actions */}
      <View style={classes.actions}>
        <TouchableOpacity
          style={classes.button}
          onPress={() => navigation.navigate("CreateOffer")}
        >
          <Feather style={classes.icon} name="plus" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EBEBEB",
  },
  title: {
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
  button: {
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
});
