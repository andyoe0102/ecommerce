import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDKPO3OZLQ1rAoJ1xB8A-1fvgNw9eXrbC0",
  authDomain: "ecommerce-e4e14.firebaseapp.com",
  databaseURL: "https://ecommerce-e4e14.firebaseio.com",
  projectId: "ecommerce-e4e14",
  storageBucket: "ecommerce-e4e14.appspot.com",
  messagingSenderId: "1066317612273",
  appId: "1:1066317612273:web:5106024e322af84dff9550",
  measurementId: "G-8BXJ405VXL"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;