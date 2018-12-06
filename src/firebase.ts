import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCEoMah1JqcFRN597q656jROofZd0UJ2p8",
  authDomain: "debugify-blog.firebaseapp.com",
  databaseURL: "https://debugify-blog.firebaseio.com",
  projectId: "debugify-blog",
  storageBucket: "debugify-blog.appspot.com",
  messagingSenderId: "768894018936"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
