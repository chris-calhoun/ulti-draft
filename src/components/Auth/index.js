import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    console.warn(authed);
    return (
      <div className='Auth'>
        <button className='nav-link btn btn-primary' onClick={this.loginClickEvent}>
          Login
        </button>
      </div>
    );
  }
}
