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

  // checking if exist user and making a new user into db
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return; // if (userAuth === false) if user not exist

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get(); 

  if(!snapShot.exists){  // if data doesn't exist
    const { displayName, email } = userAuth;
    const createdAt = new Date(); // say the current date and currnt time

    try{
      await userRef.set({  // create a new object inside DB
        displayName,
        email,
        createdAt,
        ...additionalData
      })
  
    } catch(error) {
      console.log('error creating user',error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();

};

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;