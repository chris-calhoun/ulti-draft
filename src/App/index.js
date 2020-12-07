import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/MyNavbar';
import '../styles/App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <MyNavbar />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
