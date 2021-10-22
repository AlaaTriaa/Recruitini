import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBvyaNHVwxzSX3rS8qz_z87ZqAFEyrG0LA",
  authDomain: "recruitini-59176.firebaseapp.com",
  databaseURL: "https://recruitini-59176-default-rtdb.firebaseio.com",
  projectId: "recruitini-59176",
  storageBucket: "recruitini-59176.appspot.com",
  messagingSenderId: "645415621270",
  appId: "1:645415621270:web:686c0ca61f11f85b2d68b7",
  measurementId: "G-0LQJQF9G98",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
