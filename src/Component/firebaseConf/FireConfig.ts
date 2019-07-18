import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyC4ePLxE0xgZgNyoLNgYms6k3qWkmmCbjU",
    authDomain: "reactchat-be447.firebaseapp.com",
    databaseURL: "https://reactchat-be447.firebaseio.com",
    projectId: "reactchat-be447",
    storageBucket: "",
    messagingSenderId: "151601775458",
    appId: "1:151601775458:web:039de04de1e3dc28"

   

};

if (!firebase.apps.length) {        
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();