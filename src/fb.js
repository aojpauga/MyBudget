import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBGDQ9SRfGgygPC-WQDH3WT68v1-tRLlsA",
  authDomain: "mybudget-d3d21.firebaseapp.com",
  databaseURL: "https://mybudget-d3d21.firebaseio.com",
  projectId: "mybudget-d3d21",
  storageBucket: "mybudget-d3d21.appspot.com",
  messagingSenderId: "507018841755",
  appId: "1:507018841755:web:0901aae9650070742c803e",
  measurementId: "G-SN0HGB61NM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//ßconst auth = firebase.auth();

export default db;
