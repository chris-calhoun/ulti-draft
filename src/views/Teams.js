import React, { Component } from 'react';
import LeagueTeamsData from '../helpers/data/leagueTeamsData';
import TeamData from '../helpers/data/teamData';
import TeamCard from '../components/Cards/teamCard';

export default class Teams extends Component {
  state = {
    teams: [],
  };

  componentDidMount() {
    // 1. pull boardId from URL params
    const leagueId = this.props.match.params.id;

    // 1. Make a call to the API that returns the pins associated with this board and set to state.
    this.getTeams(leagueId)
      .then((resp) => {
        // console.warn(boardId);
        // console.warn(resp);
        this.setState({ teams: resp });
      });
  }

  getTeams = (leagueId) => (
    LeagueTeamsData.getLeagueTeams(leagueId).then((response) => {
      const teamArray = [];
      response.forEach((team) => {
        teamArray.push(TeamData.getTeam(team.leagueId));
      });
      return Promise.all(teamArray);
    })
  )

  render() {
    const { teams } = this.state;
    const renderTeams = () => (
      teams.map((team) => (
        <TeamCard key={team.firebaseKey} team={team} />
      ))
    );
    return (
      <div>
        <h1>Teams</h1>
        <div className='d-flex flex-wrap container'>
          {renderTeams()}
        </div>
      </div>
    );
  }
}
