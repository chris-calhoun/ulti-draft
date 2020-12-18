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

  deletePlayer = (e) => {
    PlayerData.deletePlayer(e.target.id);
    TeamPlayersData.deleteTeamPlayers(e.target.id);
    const remainingPlayers = this.state.players.filter((player) => player.id !== e.target.id);
    this.setState({
      players: remainingPlayers,
    });
  }

  componentWillUnmount() {
    this.getPlayers();
  }

  render() {
    const { players } = this.state;
    const renderPlayers = () => (
      Object.values(players).map((player) => (
        <PlayerCard key={player.id} player={player} onDelete={this.deletePlayer} />
      ))
    );
    return (
      <div>
        <h1>Players</h1>
        { players === null ? (<h3>No players have been created</h3>) : (
          <div className='d-flex flex-wrap justify-content-center container'>
            {renderPlayers()}
          </div>
        )}
      </div>
    );
  }
}
