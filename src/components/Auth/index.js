import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AuthData from '../../helpers/data/authData';

export default class Auth extends Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <>
      {/* if not logged in, show login button */}
        { !authed ? <button className='nav-link btn btn-primary' onClick={AuthData.loginClickEvent}>Login</button>
        // else show user image and dropdown caret with logout button and name
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
        </>
    );
  }
}
