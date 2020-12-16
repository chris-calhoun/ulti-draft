import React from 'react';

export default function TeamCard({ team }) {
  return (
    <div className='team-card card m-2'>
      <h5 className='card-title'>Captain: {team.teamCaptain}</h5>
      {/* <div className='card-body'></div> */}
    </div>
  );
}
