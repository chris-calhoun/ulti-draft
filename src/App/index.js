import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import '../styles/App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
