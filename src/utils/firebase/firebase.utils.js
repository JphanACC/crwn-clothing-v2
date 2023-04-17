//initialize app creates app instance based off of some type of config
import { initializeApp } from "firebase/app";
//auth service
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
} from "firebase/auth";
//import Database stores and their methods
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";

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

//NOTE Add Collection and Document
export const addCollectionAndDocument = async (
    //EX: 'categories'
    collectionKey, 
    //EX: SHOP_DATA.JSON or actual data.
    objectsToAdd) => {
    //this access the db instance (Firestore) with collection Key.
    const collectionRef = collection(db, collectionKey);
    //writebatch returns a batch
    const batch = writeBatch(db);

    //in every object we added from parameter objectsToAdd
    objectsToAdd.forEach((object)=> {
        //collectionsRef tells the doc method to know which database it will be using. 
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })

    await batch.commit();
    console.log("batch commit done.")
}   

//NOTE Fetch/Grab/GET Categories and Document
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    //use the query to get a snapshot of the categories
    const querySnapshot = await getDocs(q);
    //we reduce the snapshot into a map. 
    //1st argument invokes on each document snapshot, 
    //2nd is final object, which should be an empty object when we initialize.
    const categoryMap = querySnapshot.docs.reduce(
        (
            //1st argument is accumulator
            acc,
            docSnapshot
        ) => { 
            //destructure the value of the data by using extracting data method of snapshot
            const { title, items } = docSnapshot.data();
            acc[title.toLowerCase()] = items;
            return acc;
        }, { }
    )
    return categoryMap;
}

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

//NOTE Sign Out
export const signOutUser = async () => {
    await signOut(auth);
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

//Auth state change
export const onAuthStateChangedListener = (callback) => {

    onAuthStateChanged(auth, callback);
}