import React, { Component } from 'react';
import { base } from '../../helpers/data/connection';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
  players: {},
}

componentDidMount() {
  const draftCode = this.props.match.params.id;
  this.ref = base.syncState('/Player', {
    context: this,
    state: 'players',
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
