import Rebase from 're-base';
import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Table,
  Button,
} from 'reactstrap';
import LeagueTeamsData from '../../helpers/data/leagueTeamsData';
import TeamData from '../../helpers/data/teamData';
import TeamPlayersData from '../../helpers/data/TeamPlayersData';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
  players: {},
  activeTeamId: '-MObnqj2MSQEVoxiSPz6',
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
    // console.warn(response);
    const teamArray = [];
    response.forEach((team) => {
      teamArray.push(TeamData.getTeam(team.teamKey));
    });
    // returning an array of all the fulfilled promises
    return Promise.all(teamArray);
  })
)

handleAddPlayerButton = (playerId) => {
  // console.warn('add button clicked');
  const { activeTeamId, players } = this.state;

  // create team-player join node
  TeamPlayersData.createTeamPlayerJoin(activeTeamId, playerId).then(() => {
    // change player available property to false.
    const playersCopy = { ...players };
    const playerCopy = { ...players[playerId] };
    playerCopy.available = false;
    playersCopy[playerId] = playerCopy;
    this.setState({
      players: playersCopy,
    });
  });
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
            {/* filter players by whether or not they are available and then render on DOM */}
            {Object.values(this.state.players).filter((player) => (
              player.available === true
            )).map((player) => (
                <tr key={player.id}>
                  <td >{player.first_name}</td>
                  <td >{player.last_name}</td>
                  <td >{player.age}</td>
                  <td >{player.gender}</td>
                  <td ><Button onClick={() => { this.handleAddPlayerButton(player.id); }}>Add</Button></td>
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
