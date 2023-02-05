//initialize app creates app instance based off of some type of config
import { initializeApp } from "firebase/app";
//auth service
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from "firebase/auth";
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
//create singleton instance that connects to Firebase database
export const db = getFirestore();

//NOTE implement login wiht Google Authentications
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//NOTE User with Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

//NOTE User Model Document Object template
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    //check if there is document reference
    //takes 3 arguments: the doc takes db instance, collection name, some identifer
    const userDocRef = doc(db, "users", userAuth.uid);
    //create snapshot
    const userSnapshot = await getDoc(userDocRef);

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
                createdAt,
                ...additionalInformation,
            });
        } catch (err) {
            console.log('error creating the user', err.message)
        }
    }

    return userDocRef;
};
