import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Player.json`, obj.data)
    .then((response) => {
      axios.patch(`${baseUrl}/Player/${response.data.name}.json`, { id: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
  // });
});

// eslint-disable-next-line
export default { createPlayer };
