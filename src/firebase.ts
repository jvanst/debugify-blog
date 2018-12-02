import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAEcG6MzCPvSs5524GkIPGuR1eTy_r-MGU",
  authDomain: "jamesvan-986b2.firebaseapp.com",
  databaseURL: "https://jamesvan-986b2.firebaseio.com",
  projectId: "jamesvan-986b2",
  storageBucket: "jamesvan-986b2.appspot.com",
  messagingSenderId: "183807237300"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
