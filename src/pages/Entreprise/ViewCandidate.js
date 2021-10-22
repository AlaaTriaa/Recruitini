import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  View,
  Linking,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import firebase, { db } from "../../services/firebase.js";
import { useEffect } from "react";
import AppBar from "../../components/AppBar";
import SkillBadge from "../../components/SkillBadge";
import IconButton from "../../components/IconButton";

export default function ViewCandidate({ navigation, route }) {
  const { email } = route.params;

  const [user, setUser] = useState(null);

  function handleNavigationBack() {
    navigation.goBack();
  }

  const callUser = () => {
    return Linking.openURL(
      `whatsapp://send?phone=${
        user.phone
      }&text=[Recruitini] Hello, I wish to talk about the job opportunity in *${
        firebase.auth().currentUser.displayName
      }*.`
    );
  };

  useEffect(() => {
    db.collection("Users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          setUser({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <AppBar
        color="#00363a"
        renderLeft={
          <TouchableOpacity onPress={handleNavigationBack}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      {user !== null && (
        <>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Person</Text>
            <Text style={styles.name}>{user.fullName}</Text>

            <Text style={styles.label}>Skills</Text>
            <View style={styles.skillsWrapper}>
              {user.skills.split(",").map((skill) => {
                return (
                  <SkillBadge
                    key={skill}
                    icon={<Feather name="check" color="#000" size={18} />}
                  >
                    {skill.toString()}
                  </SkillBadge>
                );
              })}
            </View>
          </ScrollView>

          <View>
            <IconButton
              backgroundColor="#00363a"
              color="#FFF"
              justify="center"
              icon={<Feather name="phone" color="#FFF" size={24} />}
              onPress={callUser}
            >
              Call
            </IconButton>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 24,
    marginBottom: 8,
    color: "#333",
  },
  skillsWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
