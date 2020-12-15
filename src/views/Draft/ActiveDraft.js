import Rebase from 're-base';
import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Table,
  Button,
} from 'reactstrap';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
  players: {},
}

componentDidMount() {
  const draftCode = this.props.match.params.id;
  const base = Rebase.createClass(firebase.database());
  this.ref = base.syncState('/Player', {
    context: this,
    state: 'players',
    queries: {
      orderByChild: 'leagueId',
      equalTo: `${draftCode}`,
    },
  });

  this.setState({
    draftCode,
  });
}

render() {
  return (
    <div>
      <h1>Active Draft</h1>
      <p>Draft Code: {this.state.draftCode}</p>
      <div className="d-flex justify-content-center mx-5 my-5">
        <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Add Player</th>
          </tr>
        </thead>
        <tbody>
            <>
            {Object.values(this.state.players).map((player) => (
              <tr>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.age}</td>
                <td>{player.gender}</td>
                <td><Button>Add</Button></td>
              </tr>
            ))}
            </>
        </tbody>
      </Table>
    </div>
    </div>
  );
}
}
