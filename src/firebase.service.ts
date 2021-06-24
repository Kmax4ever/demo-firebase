// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBtWHaJAxVwn-LR-Dug6z5QsyY1aXEM_hk",
  authDomain: "my-fist-fire-base.firebaseapp.com",
  databaseURL: "https://my-fist-fire-base.firebaseio.com",
  projectId: "my-fist-fire-base",
  storageBucket: "my-fist-fire-base.appspot.com",
  messagingSenderId: "710247542015",
  appId: "1:710247542015:web:9538a650c4f16e2fcc30ca"
};

// Initialize Firebase
export const initToken = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const messaging = firebase.messaging()

  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);

    } else {
      // Show permission request UI
      alert('alow notice')
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });




  loadMessages()


}

function loadMessages() {

  const userId = "cce9cd7c-18d7-424e-b65a-089e6bd8c316"

  var query = firebase.firestore()
    .collection('notices')
    .where('to', "==", userId)
    .orderBy('timestamp', 'desc')
    .limit(10);

  //Start listening to the query.
  query.onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      var message = change.doc.data();
      console.log(message);


    });
  });
}





