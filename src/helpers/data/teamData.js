import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createTeam = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Team.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Team/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createTeam };
