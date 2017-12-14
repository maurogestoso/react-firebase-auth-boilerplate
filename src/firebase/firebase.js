import * as firebase from 'firebase';

const { NODE_ENV="development" } = process.env;

const config = {
  production: {
    apiKey: "AIzaSyClFaQsybdnD4sm665J-_4TrFOs1W8kTgw",
    authDomain: "react-firebase-auth-dda30.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-dda30.firebaseio.com",
    projectId: "react-firebase-auth-dda30",
    storageBucket: "",
    messagingSenderId: "714452692329"
  },
  development: {
    apiKey: "AIzaSyBv395rMRNTtaUEhOJouL1PLHJmnSLjDEY",
    authDomain: "fir-react-auth-dev.firebaseapp.com",
    databaseURL: "https://fir-react-auth-dev.firebaseio.com",
    projectId: "fir-react-auth-dev",
    storageBucket: "",
    messagingSenderId: "320214770622"
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(config[NODE_ENV]);
}

const auth = firebase.auth();

export {
  auth,
};
