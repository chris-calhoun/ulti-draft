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
import DraftQueue from './DraftQueue';
import DraftComplete from './DraftComplete';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
  players: { name: 'Chris' },
  leagueTeams: {},
  activeCaptain: 'Chris',
  activeTeamId: '-MOmpxf2-d9HYM2fqUeo',
  base: {},
  arrCaptains: [],
  draftStarted: false,
  arrTeamIds: '',
}

componentDidMount() {
  const draftCode = this.props.match.params.id;
  // console.warn(draftCode);
  const base = Rebase.createClass(firebase.database());

  // sync list of players
  this.ref = base.syncState('/Player', {
    context: this,
    state: 'players',
    queries: {
      orderByChild: 'leagueId',
      equalTo: `${draftCode}`,
    },
  });

  // sync active team
  this.leagueTeams = base.syncState('/LeagueTeams', {
    context: this,
    state: 'leagueTeams',
    queries: {
      orderByChild: 'leagueKey',
      equalTo: `${draftCode}`,
    },
  });

  // sync active league
  this.league = base.syncState(`/League/${draftCode}/isActive`, {
    context: this,
    state: 'draftStarted',
  });
  this.setState({
    draftCode,
    base,
  });
}

handleStartButton = (e) => {
  e.preventDefault();
  this.getLeagueTeamInfo(this.state.draftCode);
  this.setState({
    draftStarted: true,
  });
}

getLeagueTeamInfo = (leagueKey) => (
  LeagueTeamsData.getLeagueTeams(leagueKey).then((response) => {
    const teamArray = [];
    response.forEach((team) => (teamArray.push(TeamData.getTeam(team.teamKey))));
    Promise.all(teamArray).then((resp) => {
      this.setState({
        arrCaptains: resp,
      });
    });
  })
)

handleAddPlayerButton = (playerId) => {
  const { activeTeamId, players } = this.state;
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
  this.draftOrder();
}

draftOrder = () => {
  if (!this.state.arrTeamIds) {
    const arrayOfTeams = Object.values(this.state.leagueTeams);
    const justIds = arrayOfTeams.map((team) => team.teamKey);
    const removedElement = justIds[0];
    const slicedArray = justIds.slice(1);
    slicedArray.push(removedElement);
    this.setState({
      // set state of new order of teams
      arrTeamIds: slicedArray,
      // set new active team
      activeTeamId: slicedArray[0],
    });
  } else {
    const justIds = this.state.arrTeamIds;
    const removedElement = justIds[0];
    const slicedArray = justIds.slice(1);
    slicedArray.push(removedElement);
    this.setState({
      arrTeamIds: slicedArray,
      activeTeamId: slicedArray[0],
    });
  }
}

// need in order to prevent memory leak
componentWillUnmount() {
  this.state.base.removeBinding(this.ref);
  this.state.base.removeBinding(this.leagueTeams);
  this.state.base.removeBinding(this.league);
}

render() {
  const { draftStarted, activeTeamId } = this.state;
  let showStartButton;
  let showQueue;
  let showDraft;
  let remainingPlayers;

  switch (draftStarted) {
    case false:
      showStartButton = (
        <Button className="btn-success" onClick={(e) => this.handleStartButton(e)}>Start</Button>
      );
      break;
    case true:
      remainingPlayers = Object.values(this.state.players).filter((player) => (player.available === true)).length;
      // console.warn(remainingPlayers);
      showQueue = (
        <DraftQueue activeCaptain={activeTeamId}/>
      );
      showDraft = (
        remainingPlayers === 0 ? (
          <>
            <DraftComplete />
          </>
        ) : (
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
        )

      );
      break;
    default:
      console.warn('draftStarted state not found.');
  }

  return (
    <div>
      <h1>Active Draft</h1>
      <p>Draft Code: {this.state.draftCode}</p>
      {showStartButton}
      {showQueue}
      <div className="d-flex justify-content-center mx-5 my-5">
        {showDraft}

    </div>
    </div>
  );
}
}
