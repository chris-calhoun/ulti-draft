import React, { Component } from 'react';
import LeaguesCard from '../components/Cards/leagueCard';
import LeagueData from '../helpers/data/leagueData';

export default class Leagues extends Component {
  state = {
    leagues: [],
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues = () => {
    LeagueData.getAllLeagues().then((response) => {
      this.setState({
        leagues: response,
      });
    });
  }

  render() {
    const { leagues } = this.state;
    const showLeagues = () => (
      leagues.map((league) => Object.keys(league).length && <LeaguesCard key={league.firebaseKey} league={league}/>)
    );
    return (
      <div>
        <h1>Leagues</h1>
        { leagues.length === 0 ? (<h3>No teams</h3>) : (
          <div className='d-flex flex-wrap justify-content-center container'>{showLeagues}</div>
        )}
      </div>
    );
  }
}
