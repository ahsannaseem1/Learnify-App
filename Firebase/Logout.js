import { getDatabase, ref, onValue, set, update, get } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../Config.js";


export const Logout = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.log("error is ==", error);
      });
  };