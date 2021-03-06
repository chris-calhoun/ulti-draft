import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createTeam = (team) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Team.json`, team)
    .then((response) => {
      axios.patch(`${baseUrl}/Team/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const getTeam = (teamId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Team/${teamId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createTeam, getTeam };
