import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createLeague = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/League.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/League/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const getLeague = (fbKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/League/${fbKey}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllLeagues = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/League.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

// eslint-disable-next-line
export default { createLeague, getLeague, getAllLeagues };
