import React, { Component } from 'react';

export default class ActiveDraft extends Component {
state = {
  draftCode: '',
}

componentDidMount() {
  const draftCode = this.props.match.params.id;
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
