import React, { Component } from 'react';

export default class InputCaptainNames extends Component {
  componentDidMount() {
    console.warn('number of teams: ', this.props.location.state.numTeams);
  }

  render() {
    return (
      <div>
        <h1>Input captain's names</h1>
      </div>
    );
  }
}
