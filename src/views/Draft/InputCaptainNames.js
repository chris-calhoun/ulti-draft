import React from 'react';
import CaptainsForm from '../../components/Forms/CaptainsForm';

export default function InputCaptainNames(props) {
  return (
      <div>
        <h1>Captain Names</h1>
        <div className='captainForm'>
          <CaptainsForm numTeams={props.location.state.numTeams}/>
        </div>
      </div>
  );
}
