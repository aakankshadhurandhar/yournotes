import firebase from 'firebase/app';
//authentication module
import 'firebase/auth';

import 'firebase/storage';
import 'firebase/firestore'





const firebaseConfig = {
    apiKey: "AIzaSyCUJsoTIotjGDhxZZQyOd99niFIdFK0gts",
    authDomain: "your-notes-6b739.firebaseapp.com",
    projectId: "your-notes-6b739",
    storageBucket: "your-notes-6b739.appspot.com",
    messagingSenderId: "921380378018",
    appId: "1:921380378018:web:b18097bec83347fe928efb"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const projectFirestore = firebaseApp.firestore();
 
  
  const projectAuth = firebase.auth();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  export { projectFirestore,projectAuth,timestamp};
 