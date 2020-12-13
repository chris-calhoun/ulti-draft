import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createLeagueTeamJoin = (arrOfObjs, teamKey, leagueKey) => new Promise((resolve, reject) => {
  // console.warn(arrOfObjs);
  arrOfObjs.forEach(() => {
    // console.warn(team);
    axios.post(`${baseUrl}/LeagueTeams.json`, { teamKey, leagueKey })
      .then((response) => {
        axios.patch(`${baseUrl}/LeagueTeams/${response.data.name}.json`, { leagueKey }).then(resolve);
      }).catch((error) => reject(error));
  });
});

// eslint-disable-next-line
export default { createLeagueTeamJoin };
