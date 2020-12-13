import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createLeagueTeamJoin = (teamKey, leagueKey) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/LeagueTeams.json`, { teamKey, leagueKey })
    .then(resolve)
    .catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createLeagueTeamJoin };
