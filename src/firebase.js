import firebase from 'firebase/compat/app'; // Importe usando 'compat'
import 'firebase/compat/auth'; // Importe o módulo de autenticação
import 'firebase/compat/firestore'; // Importe o módulo do firestore
import 'firebase/compat/storage'; // Importe o módulo de storage


const firebaseConfig = {
    apiKey: "AIzaSyD7nbT4CkOMrpzRZh0n0mR7ZVPHwvS6Trc",
    authDomain: "jubonfas-12b35.firebaseapp.com",
    projectId: "jubonfas-12b35",
    storageBucket: "jubonfas-12b35.appspot.com",
    messagingSenderId: "1060752335280",
    appId: "1:1060752335280:web:bdcc3ac9d90d95f90cb675",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage(); // Exporte o módulo de storage

export default firebase;