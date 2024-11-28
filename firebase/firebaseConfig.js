// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAaERJjbRBDJA1CFUZadEAjYrFPpBTGTu8',
  authDomain: 'deads-bf1ee.firebaseapp.com',
  databaseURL: 'https://deads-bf1ee-default-rtdb.firebaseio.com/',
  projectId: 'deads-bf1ee',
  storageBucket: 'deads-bf1ee.firebasestorage.app',
  messagingSenderId: '118258335822',
  appId: '1:118258335822:web:3cfea3588330aa1483431f',
  measurementId: 'G-6T1WVP02R9',
};

// Initialize Firebase
const apps = getApps();
const app = apps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Authentication functions
export const signUpWithEmailPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Profile functions
export const saveUserProfile = async (userId, name, email, bio, avatarUri) => {
  try {
    // Save profile to Firestore
    await setDoc(doc(db, 'users', userId), { name, email, bio });
    
    // If there's a new avatar, upload to Firebase Storage
    if (avatarUri) {
      const avatarRef = ref(storage, `avatars/${userId}`);
      const response = await fetch(avatarUri);
      const blob = await response.blob();
      await uploadBytes(avatarRef, blob);
      
      // Get the avatar URL
      const avatarUrl = await getDownloadURL(avatarRef);
      await setDoc(doc(db, 'users', userId), { avatar: avatarUrl }, { merge: true });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('No user profile found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export { db, storage, auth };

export default app;
