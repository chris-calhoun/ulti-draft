import Rebase from 're-base';
import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Table,
  Button,
} from 'reactstrap';
import LeagueTeamsData from '../../helpers/data/leagueTeamsData';
import TeamData from '../../helpers/data/teamData';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
  players: {},
  activeCaptain: '',
  base: {},
  arrCaptains: {},
}

componentDidMount() {
  const draftCode = this.props.match.params.id;
  const base = Rebase.createClass(firebase.database());

  this.ref = base.syncState('/Player', {
    context: this,
    state: 'players',
    queries: {
      orderByChild: 'leagueId',
      equalTo: `${draftCode}`,
    },
  });

  // get league teams
  this.getLeagueTeamInfo(draftCode)
    .then((response) => {
      this.setState({
        arrCaptains: response,
        draftCode,
        base,
      });
    });
}

getLeagueTeamInfo = (leagueKey) => (
  LeagueTeamsData.getLeagueTeams(leagueKey).then((response) => {
    console.warn(response);
    const teamArray = [];
    response.forEach((team) => {
      teamArray.push(TeamData.getTeam(team.teamKey));
    });
    // returning an array of all the fulfilled promises
    return Promise.all(teamArray);
  })
)

handleAddPlayerButton = () => {
  console.warn('add button clicked');
}

// need in order to prevent memory leak
componentWillUnmount() {
  this.state.base.removeBinding(this.ref);
}

render() {
  return (
    <div>
      <h1>Active Draft</h1>
      <p>Draft Code: {this.state.draftCode}</p>
      <div className="d-flex justify-content-center mx-5 my-5">
        <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Add Player</th>
          </tr>
        </thead>
        <tbody>
            <>
            {Object.values(this.state.players).map((player) => (
              <tr>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.age}</td>
                <td>{player.gender}</td>
                <td><Button onClick={this.handleAddPlayerButton}>Add</Button></td>
              </tr>
            ))}
            </>
        </tbody>
      </Table>
    </div>
    </div>
  );
}
}
