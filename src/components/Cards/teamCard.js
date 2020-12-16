import React from 'react';
import AppModal from '../Modal/appModal';

export default function TeamCard({ team }) {
  return (
    <div className='team-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>Captain: {team.teamCaptain}</h5>
        <AppModal title={'Team Players'} buttonLabel={'View Players'}></AppModal>
      </div>
    </div>
  );
}
