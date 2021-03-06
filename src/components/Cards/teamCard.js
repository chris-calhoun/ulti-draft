import React from 'react';
import { Link } from 'react-router-dom';

export default function TeamCard({ team, leagueId }) {
  return (
    <div className='team-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>Team Captain</h5>
        <p>{team.teamCaptain}</p>
        <Link
          className='btn btn-primary'
          color='success'
          to={{
            pathname: `/players/${team.firebaseKey}`,
            leagueId,
          }}>
          View Players
        </Link>
      </div>
    </div>
  );
}
