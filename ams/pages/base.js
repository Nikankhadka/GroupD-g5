//importing the firevbase library

import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";



//configuration of project from fire base itseld
const firebaseConfig = {
    apiKey: "AIzaSyA9nWKyu6-6aISMqiVoQ3Tpg8gZihSPCx4",
    authDomain: "agriculture-management-s-6bbd3.firebaseapp.com",
    projectId: "agriculture-management-s-6bbd3",
    storageBucket: "agriculture-management-s-6bbd3.appspot.com",
    messagingSenderId: "36839516935",
    appId: "1:36839516935:web:7a677ea7537b60203e33a2",
    measurementId: "G-6485E8CRJK"
  };

//initializing the fire base app with config setting
export const app=initializeApp(firebaseConfig)
export const storage=getStorage(app)
 