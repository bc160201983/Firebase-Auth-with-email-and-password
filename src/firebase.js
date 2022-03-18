import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbvz7YxxqYXCW2wt5Vscxgtm15fnAy-lo",
  authDomain: "vcard-b7a06.firebaseapp.com",
  projectId: "vcard-b7a06",
  storageBucket: "vcard-b7a06.appspot.com",
  messagingSenderId: "1052151724072",
  appId: "1:1052151724072:web:2c285486ae79edf5265d1d",
};

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);
export const auth = getAuth(app);
