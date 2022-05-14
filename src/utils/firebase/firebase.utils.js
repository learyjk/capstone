import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY0naLYXI2aMjHIb7udiYrX6nWlNFY9eA",
  authDomain: "crwn-clothing-53c92.firebaseapp.com",
  projectId: "crwn-clothing-53c92",
  storageBucket: "crwn-clothing-53c92.appspot.com",
  messagingSenderId: "144675572217",
  appId: "1:144675572217:web:04638b4623f7ff2bb3d528"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  console.log(userAuth);

  const userDocRef = doc(db, 'users', userAuth.uid);
  //console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log('error creating the user', e.message);
    }
  }

  //if user data dexists
  //return back user data

  //if not then create the doc
}