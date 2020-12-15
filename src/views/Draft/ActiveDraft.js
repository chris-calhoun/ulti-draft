import Rebase from 're-base';
import firebase from 'firebase';
import React, { Component } from 'react';

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
      <p>DraftCode: {this.state.draftCode}</p>
    </div>
  );
}
}
