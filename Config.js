import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBy5VnOUX6r8qW2sqtvTdRM63ZPsTlGhAI",
  authDomain: "learnify-app-f7724.firebaseapp.com",
  projectId: "learnify-app-f7724",
  storageBucket: "learnify-app-f7724.appspot.com",
  messagingSenderId: "420957728965",
  appId: "1:420957728965:web:25e77fa7987218ec3800ac",
  measurementId: "G-Q8N9D7K54K",
  databaseURL: "https://learnify-app-f7724-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;