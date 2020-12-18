import React from 'react';

export default function TeamCard({ player }) {
  return (
    <div className='team-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>{player.first_name} {player.last_name}</h5>
      </div>
    </div>
  );
}
