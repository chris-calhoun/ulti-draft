import axios from 'axios';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

const createTeam = (arrOfObjs) => new Promise((resolve, reject) => {
  // console.warn(arrOfObjs);
  arrOfObjs.forEach((team) => {
    // console.warn(team);
    axios.post(`${baseUrl}/Team.json`, team)
      .then((response) => {
        axios.patch(`${baseUrl}/Team/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
      }).catch((error) => reject(error));
  });
});

// eslint-disable-next-line
export default { createTeam };
