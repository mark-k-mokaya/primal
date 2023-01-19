import {initializeApp} from 'firebase/app';
import {
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged} from 'firebase/auth';
import {
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch, 
  query, 
  getDocs} from 'firebase/firestore';
  
// import {signInWithRedirect, getRedirectResult} from 'firebase/auth';
// import {useEffect} from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcbymZMje-YJ45srZEmYOoFcmJnoaJlYU",
    authDomain: "primal-db.firebaseapp.com",
    projectId: "primal-db",
    storageBucket: "primal-db.appspot.com",
    messagingSenderId: "1090303402349",
    appId: "1:1090303402349:web:b3e724b51329ef13157a64"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth, googleProvider);

// export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd, field)=>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  // await Promise.reject(new Error("Uh Oh! New error!"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={})=>{
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ... additionalInfo})
    }catch(error){
      console.log("Unexpected error occured: " + error.message);
    }
  }
  return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || ! password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || ! password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth)=>{
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
}