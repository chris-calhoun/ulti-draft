import Rebase from 're-base';
import firebase from 'firebase';
import firebaseConfig from '../apiKeys';
// import 'firebase/database';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

const database = firebase.database();
const base = Rebase.createClass(database);

export default firebaseApp;

// eslint-disable-next-line
export { base };
