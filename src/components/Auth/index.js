import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

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
        { !authed ? <button className='nav-link btn btn-primary' onClick={this.loginClickEvent}>Login</button>
          // : <button className='nav-link btn btn-danger' onClick={this.logMeOut}>Sign Out</button>
          : <>
          <img className="userInfo" src={authed?.photoURL} alt={authed?.displayName} />
          <UncontrolledDropdown>
          <DropdownToggle nav caret>
          </DropdownToggle>
          <DropdownMenu right>
          <DropdownItem>
            {authed?.displayName}
            </DropdownItem>
            <DropdownItem>
              <div
                className='nav-link btn btn-danger'
                onClick={(e) => this.logMeOut(e)}
              >
                Logout
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </>
        }
      </div>
    );
  }
}
