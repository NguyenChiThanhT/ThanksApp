import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyCrW1LbKCz60DUpUh79bRMUGRthI4lxyCc",
    authDomain: "fir-reactnative-f5c43.firebaseapp.com",
    databaseURL: "https://fir-reactnative-f5c43.firebaseio.com",
    projectId: "fir-reactnative-f5c43",
    storageBucket: "fir-reactnative-f5c43.appspot.com",
    messagingSenderId: "413850205635"
};
export const firebaseApp = firebase.initializeApp(config);