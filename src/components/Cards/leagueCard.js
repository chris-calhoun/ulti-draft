import React from 'react';
import { Link } from 'react-router-dom';

export default function LeaguesCard({ league }) {
  return (
    <div className='board-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>{league.leagueName}</h5>
        <p className='card-text'>Start Date: {league.startDateF}</p>
        <p className='card-text'>End Date: {league.endDateF}</p>
        <p className='card-text'>Field Address: {league.fieldAddress}</p>
        <p className='card-text'>{league.city}, {league.state} {league.zipcode}</p>
        <Link className='btn btn-primary' color="success" to={`/teams/${league.firebaseKey}`}>
          View Teams
        </Link>
      </div>
    </div>
  );
}
