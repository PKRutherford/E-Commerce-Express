const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

// Configure Firebase.

const firebaseConfig = {
  apiKey: "AIzaSyC_FMSpxqO_e4L00FcUM4UNi0uROLxcUYo",
  authDomain: "lakshmi-embroidery.firebaseapp.com",
  projectId: "lakshmi-embroidery",
  storageBucket: "lakshmi-embroidery.appspot.com",
  messagingSenderId: "310807478568",
  appId: "1:310807478568:web:a83b49398daded6fe3d01d",
  measurementId: "G-6RDMW229DK",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

module.exports = db;
