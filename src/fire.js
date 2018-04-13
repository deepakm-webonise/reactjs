import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCY1nQ8ZzJxsbdAOLqWOHK0aHbCfr0OgT0",
  authDomain: "reactjs-deepak.firebaseapp.com",
  databaseURL: "https://reactjs-deepak.firebaseio.com",
  projectId: "reactjs-deepak",
  storageBucket: "reactjs-deepak.appspot.com",
  messagingSenderId: "900023650870"
};

var fire = firebase.initializeApp(config);
export default fire;
