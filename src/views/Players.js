import React, { Component } from 'react';
import TeamPlayersData from '../helpers/data/TeamPlayersData';
import PlayerData from '../helpers/data/playerData';
import PlayerCard from '../components/Cards/playerCard';

export default class Players extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    // 1. pull teamId from URL params
    const teamId = this.props.match.params.id;

    // 1. Make a call to the API that returns the players associated with this team and set to state.
    this.getPlayers(teamId)
      .then((resp) => {
        this.setState({ players: resp });
      });
  }

  getPlayers = (teamId) => (
    TeamPlayersData.getTeamPlayers(teamId).then((response) => {
      const playerArray = [];
      response.forEach((player) => {
        // console.warn(team.teamKey);
        playerArray.push(PlayerData.getPlayer(player.playerKey));
      });
      return Promise.all(playerArray);
    })
  )

  render() {
    const { players } = this.state;
    const renderPlayers = () => (
      players.map((player) => (
        <PlayerCard key={player.firebaseKey} player={player} />
      ))
    );
    return (
      <div>
        <h1>Players</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {renderPlayers()}
        </div>
      </div>
    );
  }
}
