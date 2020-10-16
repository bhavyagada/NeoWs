import * as firebase from 'firebase/app'

import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyD0UumfCKqCghhb_3J2sU9IPBqyBLgMl7Y",
  authDomain: "scribeless-f4250.firebaseapp.com",
  databaseURL: "https://scribeless-f4250.firebaseio.com",
  projectId: "scribeless-f4250",
  storageBucket: "scribeless-f4250.appspot.com",
  messagingSenderId: "815440542478",
  appId: "1:815440542478:web:88f4575f588899fd60b55f"
};
const fb = firebase.initializeApp(config);

export default fb
