import { GoogleAuthProvider } from "@firebase/auth";
import firebase from "firebase/compat/app"; //v9
import "firebase/compat/auth"; //v9
import "firebase/compat/firestore"; //v9
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyC7-8N2EEsEh4AFyNXhOdLxEGP-xFiDlpk",
  authDomain: "tinder-redux-d3354.firebaseapp.com",
  projectId: "tinder-redux-d3354",
  storageBucket: "tinder-redux-d3354.appspot.com",
  messagingSenderId: "347009025313",
  appId: "1:347009025313:web:8b3feaa8251c50e8c8ea60",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export async function loginWithGoogle() {
  const auth = firebase.auth();
  let provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  return auth.signInWithPopup(provider).then((snap) => snap.user);
}