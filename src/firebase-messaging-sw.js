importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyA2d9qFLmKJMIQJKXtKlQ1gk21Uv6n3IvI",
  authDomain: "moniepassweb.firebaseapp.com",
  projectId: "moniepassweb",
  storageBucket: "moniepassweb.appspot.com",
  messagingSenderId: "87681054582",
  appId: "1:87681054582:web:c7fe7dac9426d10812ac57",
  measurementId: "G-SF77453M66",
});
const messaging = firebase.messaging();
