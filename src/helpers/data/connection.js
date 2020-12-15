import firebase from 'firebase';
import firebaseConfig from '../apiKeys';
// import 'firebase/database';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export default firebaseApp;
