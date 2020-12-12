import React, { Component } from 'react';
import CaptainsForm from '../../components/Forms/CaptainsForm';

export default class InputCaptainNames extends Component {
  componentDidMount() {
    console.warn('number of teams: ', this.props.location.state.numTeams);
  }

  render() {
    return (
      <div>
        <h1>Input captain's names</h1>
        <div className='captainForm'>
          <CaptainsForm />
        </div>
      </div>
    );
  }
}
