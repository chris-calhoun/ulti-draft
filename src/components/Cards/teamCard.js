import React from 'react';
import { Link } from 'react-router-dom';

export default function TeamCard({ team }) {
  return (
    <div className='team-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>Team Captain</h5>
        <p>{team.teamCaptain}</p>
        <Link className='btn btn-primary' color="success" to={`/players/${team.firebaseKey}`}>
          View Players
        </Link>
      </div>
    </div>
  );
}
