import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Player.json`, obj.data)
    .then((response) => {
      axios.patch(`${baseUrl}/Player/${response.data.name}.json`, { id: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
  // });
});

const getPlayer = (playerId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Player/${playerId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deletePlayer = (fbKey) => axios.delete(`${baseUrl}/Player/${fbKey}.json`);

// eslint-disable-next-line
export default { createPlayer, getPlayer, deletePlayer };
