import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createTeamPlayerJoin = (teamKey, playerKey) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/TeamPlayers.json`, { teamKey, playerKey })
    .then(resolve)
    .catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createTeamPlayerJoin };
