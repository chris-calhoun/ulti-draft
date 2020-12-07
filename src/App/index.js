import React from 'react';
import firebase from 'firebase/app';
import fbConnection from '../helpers/data/connection';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/MyNavbar';
import '../styles/App.scss';

fbConnection();

class App extends React.Component {
  state = {
    authed: null,
  };

  componetDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <MyNavbar authed={authed} />
          <Routes authed={authed} />
        </Router>
      </div>
    );
  }
}

export default App;
