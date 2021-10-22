import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import AppBar from "../../components/AppBar";
import OfferCard from "../../components/OfferCard";
import Warning from "../../components/Warning";
import firebase, { db } from "../../services/firebase.js";
import { CommonActions } from "@react-navigation/native";
import { useEffect } from "react";
import SkillsTab from "../../components/SkillsTab";

export default function FindOffer({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [myOffers, setMyOffers] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: firebase.auth().currentUser.email,
    name: firebase.auth().currentUser.displayName,
  };

  useEffect(() => {
    db.collection("Offers")
      .get()
      .then((querySnapshot) => {
        let offers = [];
        querySnapshot.forEach((documentSnapshot) => {
          let data = documentSnapshot.data();
          let exists = false;
          if (
            !data.acceptedUsers ||
            data.acceptedUsers == undefined ||
            data.acceptedUsers.length == undefined ||
            data.acceptedUsers.length == 0
          ) {
          } else {
            exists = data.acceptedUsers.some(
              (userF) => userF.email == user.email
            );
          }

          if (!exists) {
            if (
              !data.refusedUsers ||
              data.refusedUsers == undefined ||
              data.refusedUsers.length == undefined ||
              data.refusedUsers.length == 0
            ) {
            } else {
              exists = data.refusedUsers.some(
                (userF) => userF.email == user.email
              );
            }
          }

          if (!exists) {
            offers.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          }
        });
        console.log(offers);
        console.log("Indice = ", activeIndex);
        console.log("\n\n");
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

  function doLogout() {
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
  }

  const doApprove = () => {
    let data = myOffers[activeIndex];
    setIsLoading(true);
    db.collection("Offers")
      .doc(data.id)
      .update({
        acceptedUsers: firebase.firestore.FieldValue.arrayUnion(user),
      })
      .then(() => {
        setIsLoading(false);
        setActiveIndex(activeIndex + 1);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const doDeny = () => {
    let data = myOffers[activeIndex];
    setIsLoading(true);
    db.collection("Offers")
      .doc(data.id)
      .update({
        refusedUsers: firebase.firestore.FieldValue.arrayUnion(user),
      })
      .then(() => {
        setIsLoading(false);
        setActiveIndex(activeIndex + 1);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={classes.wrapper}>
      <AppBar
        renderLeft={
          <TouchableOpacity
            onPress={() => logoutAlert("Confirm", "Do you want to log out??")}
          >
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        }
        renderRight={
          <TouchableOpacity
            onPress={() => {
              setReload(!reload), setActiveIndex(0);
            }}
          >
            <Feather name="refresh-cw" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      {activeIndex == myOffers.length ? null : (
        <SkillsTab skills={myOffers[activeIndex]?.skills} />
      )}

      <View style={classes.cardWrapper}>
        <View style={classes.cardWrapper}>
          {activeIndex == myOffers.length ? (
            <Warning
              title="No jobs for now!"
              message="There are no jobs avaliable currently"
            />
          ) : (
            <OfferCard
              onSwipeLeft={doDeny}
              onSwipeRight={doApprove}
              description={myOffers[activeIndex].description}
              title={myOffers[activeIndex].jobTitle}
              business={myOffers[activeIndex].businessName}
              place={myOffers[activeIndex].place}
              value={myOffers[activeIndex].payment}
            />
          )}
        </View>
      </View>

      {activeIndex == myOffers.length ? null : (
        <View style={classes.actions}>
          <TouchableOpacity
            style={classes.buttonReject}
            onPress={doDeny}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="rgba(255, 255, 255,1)" />
            ) : (
              <Feather style={classes.icon} name="x" size={38} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={classes.buttonApprove}
            onPress={doApprove}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="rgba(255, 255, 255,1)" />
            ) : (
              <Feather style={classes.icon} name="check" size={38} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const classes = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 3,
  },
  skills: {
    marginLeft: 5,
    marginVertical: 8,
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
  },
  skillsText: {
    marginLeft: 16,
    color: "#ffffff",
    textTransform: "capitalize",
  },
  wrapper: {
    flex: 1,
    padding: 24,
    paddingTop: 24 + Constants.statusBarHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EBEBEB",
  },
  cardWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  actions: {
    padding: 24,
    height: 120,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonReject: {
    width: 84,
    height: 84,
    backgroundColor: "#b71c1c",
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonApprove: {
    width: 84,
    height: 84,
    backgroundColor: "#1b5e20",
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#fff",
  },
});
