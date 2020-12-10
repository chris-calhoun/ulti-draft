import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createLeague = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/League.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/League/${response.data.name}.json`, {firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

export default { createLeague };