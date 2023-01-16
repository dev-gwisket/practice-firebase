import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDn3gAjJyDAgkgMVJgSB-pPwazWrE1i9xg",
  authDomain: "fir-practice-a3876.firebaseapp.com",
  projectId: "fir-practice-a3876",
  storageBucket: "fir-practice-a3876.appspot.com",
  messagingSenderId: "303182350871",
  appId: "1:303182350871:web:a05905cf51cfb0a30bea52"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'books');

getDocs(colRef)
  .then(snapshot => {
    let books = [];

    snapshot.docs.forEach(doc => {
      books.push({
        ...doc.data(),
        id: doc.id
      });
    });

    console.log(books);
  }).catch(err => {
    console.log(err.message);
  })

