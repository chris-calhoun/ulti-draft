import React, { Component } from 'react';
import LeagueTeamsData from '../helpers/data/leagueTeamsData';
import TeamData from '../helpers/data/teamData';
import TeamCard from '../components/Cards/teamCard';

export default class Teams extends Component {
  state = {
    teams: [],
  };

  componentDidMount() {
    // 1. pull leagueId from URL params
    const leagueId = this.props.match.params.id;

    // 1. Make a call to the API that returns the teams associated with this league and set to state.
    this.getTeams(leagueId)
      .then((resp) => {
        this.setState({ teams: resp });
      });
  }

  getTeams = (leagueId) => (
    LeagueTeamsData.getLeagueTeams(leagueId).then((response) => {
      const teamArray = [];
      response.forEach((team) => {
        // console.warn(team.teamKey);
        teamArray.push(TeamData.getTeam(team.teamKey));
      });
      return Promise.all(teamArray);
    })
  )

  render() {
    const { teams } = this.state;
    const renderTeams = () => (
      teams.map((team) => (
        Object.keys(team).length && <TeamCard key={team.firebaseKey} team={team} />
      ))
    );
    return (
      <div>
        <h1>Teams</h1>
        { teams.length === 0 ? (<h3>No teams</h3>) : (
          <div className='d-flex flex-wrap container justify-content-center'>
            {renderTeams}
          </div>
        )}
      </div>
    );
  }
}
