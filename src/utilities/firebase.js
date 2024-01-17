
import { initializeApp } from "firebase/app";
import { useState, useEffect, useCallback } from "react";
import { getDatabase, ref, onValue, update, connectDatabaseEmulator , get} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithCredential,
  connectAuthEmulator
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCoXVCt8LwrJoEPgSPqUe5W_vHO6dCHkw",
  authDomain: "memorytrails-4fadd.firebaseapp.com",
  databaseURL: "https://memorytrails-4fadd-default-rtdb.firebaseio.com",
  projectId: "memorytrails-4fadd",
  storageBucket: "memorytrails-4fadd.appspot.com",
  messagingSenderId: "649785401184",
  appId: "1:649785401184:web:406b265810ab4373830805",
  measurementId: "G-TMLE0QPNNW"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app);


export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const uploadFileToFirebase = async (file) => {
  if (!file) {
      throw new Error("No file provided");
  }
  const storage = getStorage();
  console.log("storage:",storage)
  console.log("filename:",file.name)
  const fileRef = ref(storage, "newyork.jpg");
  console.log("storageref:",fileRef)

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
  }
};

export const getDbData = async (path) => {
  const snapshot = await get(ref(database, path));
  return snapshot.val();
}

export const writeToDb = (path, value) => {
  update(ref(database, path), value)
      .then(() => console.log("Successfully written to database.", value))
      .catch((error) => console.log(error));
}

  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
  };
  
  const firebaseSignOut = () => signOut(getAuth(app));
  
  export { firebaseSignOut as signOut };
  
  export const useAuthState = () => {
    const [user, setUser] = useState();
    useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);
    return [user];
  };
