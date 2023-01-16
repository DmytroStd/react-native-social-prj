// import { initializeApp } from "firebase/app";
// // import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "AIzaSyA3vus_w7tEZ8JAb8ZoDTtGQHLJkihtm4E",
//   authDomain: "rn-photo-prj.firebaseapp.com",
//   projectId: "rn-photo-prj",
//   storageBucket: "rn-photo-prj.appspot.com",
//   messagingSenderId: "83580542249",
//   appId: "1:83580542249:web:5e89fde4019994336f6b38",
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getAuth(app);

// export default db;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3vus_w7tEZ8JAb8ZoDTtGQHLJkihtm4E",
  authDomain: "rn-photo-prj.firebaseapp.com",
  projectId: "rn-photo-prj",
  storageBucket: "rn-photo-prj.appspot.com",
  messagingSenderId: "83580542249",
  appId: "1:83580542249:web:5e89fde4019994336f6b38",
};
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const firestore = firebase.firestore();

export const realtime = firebase.database();

export default firebase;
