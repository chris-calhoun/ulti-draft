import firebase from 'firebase';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser?.uid;

const loginClickEvent = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

// eslint-disable-next-line
export default { getUid, loginClickEvent };
