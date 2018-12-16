import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCEoMah1JqcFRN597q656jROofZd0UJ2p8",
  authDomain: "debugify-blog.firebaseapp.com",
  databaseURL: "https://debugify-blog.firebaseio.com",
  projectId: "debugify-blog",
  storageBucket: "debugify-blog.appspot.com",
  messagingSenderId: "768894018936"
};

firebase.initializeApp(config);

export default firebase;
