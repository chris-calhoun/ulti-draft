import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createLeagueTeamJoin = (teamKey, leagueKey) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/LeagueTeams.json`, { teamKey, leagueKey, isActive: false })
    .then((response) => {
      (resolve(response.data));
    }).catch((error) => reject(error));
});

const getLeagueTeams = (leagueKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/LeagueTeams.json?orderBy="leagueKey"&equalTo="${leagueKey}"`).then(
    (response) => {
      resolve(Object.values(response.data));
    },
  ).catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createLeagueTeamJoin, getLeagueTeams };
