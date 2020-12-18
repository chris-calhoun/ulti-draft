import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createTeamPlayerJoin = (teamKey, playerKey) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/TeamPlayers.json`, { teamKey, playerKey })
    .then(resolve)
    .catch((error) => reject(error));
});

const getTeamPlayers = (teamKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/TeamPlayers.json?orderBy="teamKey"&equalTo="${teamKey}"`).then(
    (response) => {
      resolve(Object.values(response.data));
    },
  ).catch((error) => reject(error));
});

const deleteTeamPlayers = (playerId) => {
  axios.get(`${baseUrl}/TeamPlayers.json?orderBy="playerKey"&equalTo="${playerId}"`)
    .then((response) => {
      const teamPlayerskeys = Object.keys(response.data);
      teamPlayerskeys.forEach((teamPlayerFBKey) => {
        axios.delete(`${baseUrl}/TeamPlayers/${teamPlayerFBKey}.json`);
      });
    });
};

// eslint-disable-next-line
export default { createTeamPlayerJoin, getTeamPlayers, deleteTeamPlayers };
