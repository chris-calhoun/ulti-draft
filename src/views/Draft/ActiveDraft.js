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
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>25</td>
          <td>M</td>
          <Button>Add</Button>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}
}
