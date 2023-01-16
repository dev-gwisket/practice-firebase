import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore';

import {
  getAuth
} from 'firebase/auth';

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
const auth = getAuth();

const colRef = collection(db, 'books');
const q =
  query(
    colRef,
    orderBy('createdAt')
  );

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

onSnapshot(q, snapshot => {
  let books = [];

  snapshot.docs.forEach(doc => {
    books.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  console.log(books);
});

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', e => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  }).then(_ => {
    addBookForm.reset();
  });
});

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(_ => {
      deleteBookForm.reset();
    })
});

const docRef = doc(db, 'books', 'ncP8Ak1LZ6elbzIZdXqe');
getDoc(docRef)
  .then(doc => {
    console.log(doc.data(), doc.id);
  });

onSnapshot(docRef, doc => {
  console.log(doc.data(), doc.id);
});

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  }).then(_ => {
    updateForm.reset();
  });
});

