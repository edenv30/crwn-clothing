import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyB_VKUB4ech2JCJwVbu2iJd0b96h8medQg",
    authDomain: "crwn-db-66888.firebaseapp.com",
    databaseURL: "https://crwn-db-66888.firebaseio.com",
    projectId: "crwn-db-66888",
    storageBucket: "crwn-db-66888.appspot.com",
    messagingSenderId: "11139594270",
    appId: "1:11139594270:web:1766d9dfb4a0016742560f",
    measurementId: "G-91LQJY4XFH"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;