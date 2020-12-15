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
  arrDraftCaptains: {},
  activeCaptain: '',
  base: {},
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
      arrCaptains: {},
    },
  });

// get league teams

this.getLeagueTeamInfo(draftCode)
  .then((response) => {
    this.setState({
      arrCaptains: response,
      draftCode,
      base,
      // arrDraftCaptains: arrCaptains,
    });
  })


}

getLeagueTeamInfo = (leagueKey) => (
  LeagueTeamsData.getLeagueTeams(leagueKey).then((response) => {
    const teamArray = [];
    response.forEach((team) => {
      teamArray.push(TeamData.getTeam(team.Key));;
    });
    // returning an array of all the fulfilled promises
    return Promise.all(teamArray);
  })
)

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
                <td><Button>Add</Button></td>
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
