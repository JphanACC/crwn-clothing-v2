//initialize app creates app instance based off of some type of config
import { initializeApp } from "firebase/app";
//auth service
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import Database stores
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLJFXsVbQVqWIEEHFrOAnMppcwfikEyJw",
  authDomain: "crown-clothing-db-aa799.firebaseapp.com",
  projectId: "crown-clothing-db-aa799",
  storageBucket: "crown-clothing-db-aa799.appspot.com",
  messagingSenderId: "127143358766",
  appId: "1:127143358766:web:de2707d60942337eca0abf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//For Google Authnetication to work.
//GoogleAuthProvider is a class we get from Firebase Authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//this auth is BEING TRACKED for entire of our application
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//create singleton instance that connects to Firebase database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    //check if there is document reference
    //takes 3 arguments: the doc takes db instance, collection name, some identifer
    const userDocRef = doc(db, "users", userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data does not exist
    //if user data exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            //then create a userDoc reference using the snapshot
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (err) {
            console.log('error creating the user', err.message)
        }
    }

    return userDocRef;
};
