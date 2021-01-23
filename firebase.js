import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import dotenv from "dotenv";
dotenv.config()

// console.log("process.env")

// console.log(process.env.REACT_APP_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
  projectId:process.env.REACT_APP_PROJECT_ID ,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID ,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCrLv-GlgRRxxHVnKQRYrSAABqL5Xp-HrI",
//   authDomain: "fir-auth-a466a.firebaseapp.com",
//   projectId: "fir-auth-a466a",
//   storageBucket: "fir-auth-a466a.appspot.com",
//   messagingSenderId: "516313618457",
//   appId: "1:516313618457:web:a384eecb08adccc2f7b288",
//   measurementId: "G-WXS2JJ31D2"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
