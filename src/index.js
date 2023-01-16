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
  serverTimestamp
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

