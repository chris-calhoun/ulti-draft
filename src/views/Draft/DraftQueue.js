import React, { Component } from 'react';

export default class DraftQueue extends Component {
  render() {
    const { activeCaptain } = this.props;
    return (
      <div>
        <p>Active Captain: {activeCaptain}</p>
      </div>
    );
  }
}
