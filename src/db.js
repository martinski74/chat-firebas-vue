import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyBL_jue5XPii2qDV_wlNrG0xOof6wC8rHY",
  authDomain: "firechat-vue-86f94.firebaseapp.com",
  databaseURL:
    "https://firechat-vue-86f94-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firechat-vue-86f94",
  storageBucket: "firechat-vue-86f94.appspot.com",
  messagingSenderId: "372912855970",
  appId: "1:372912855970:web:ea3ddcee9360dfd28470fb",
};

const db = firebase.initializeApp(config);
export default db;
