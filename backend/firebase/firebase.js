import firebase from 'firebase/app'
import 'firebase/auth'
import  'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'




const firebaseConfig = {
    apiKey: "AIzaSyDSoAAtcr5V3I66tsT8HorrzmCq9goWKZo",
    authDomain: "accresencebook.firebaseapp.com",
    databaseURL: "https://accresencebook-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "accresencebook",
    storageBucket: "accresencebook.appspot.com",
    messagingSenderId: "15169766127",
    appId: "1:15169766127:web:e431e85844506c1548511a",
    measurementId: "G-HBC65MZN98"
};



if(!firebase.apps.length){
 firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const db = firebase.firestore()
const fireStorage = firebase.storage()
const realtimeDb = firebase.database()

const provider = new firebase.auth.GoogleAuthProvider()

export {auth,db,fireStorage,realtimeDb,provider}


  