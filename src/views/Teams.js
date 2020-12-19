import React, { Component } from 'react';
import LeagueTeamsData from '../helpers/data/leagueTeamsData';
import TeamData from '../helpers/data/teamData';
import TeamCard from '../components/Cards/teamCard';
import LeagueData from '../helpers/data/leagueData';
import AppModal from '../components/Modal/appModal';
import UpdateLeagueForm from '../components/Forms/UpdateLeagueForm';

export default class Teams extends Component {
  state = {
    teams: [],
    league: {},
  };

  componentDidMount() {
    // 1. pull leagueId from URL params
    const leagueId = this.props.match.params.id;

    this.getLeagueInfo(leagueId);
    // 1. Make a call to the API that returns the teams associated with this league and set to state.
    this.getTeams(leagueId)
      .then((resp) => {
        this.setState({ teams: resp });
      });
  }

  getLeagueInfo = (leagueId) => {
    LeagueData.getLeague(leagueId).then((response) => {
      this.setState({
        league: response,
      });
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
    const { teams, league } = this.state;
    const renderTeams = () => (
      Object.values(teams).map((team) => (
        <TeamCard key={team.firebaseKey} team={team} />
      ))
    );
    return (
      <div>
        <h1>Teams</h1>
        { teams === null ? (<h3>No teams have been created</h3>) : (
          <>
          <div className='mx-5'>
            <h4>{league.leagueName}</h4>
            <AppModal title={'Update League'} buttonLabel={'Update League'}>
              {Object.keys(league).length && <UpdateLeagueForm league={league} onUpdate={this.getLeagueInfo}/>}
            </AppModal>
          </div>
          <div className='d-flex flex-wrap justify-content-center container'>
            {renderTeams()}
          </div>
          </>
        )}
      </div>
    );
  }
}
