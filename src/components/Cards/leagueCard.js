import React from 'react';

export default function LeaguesCard({ league }) {
  return (
    <div className='board-card card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>{league.leagueName}</h5>
        <p className='card-text'>Start Date: {league.startDateF}</p>
        <p className='card-text'>End Date: {league.endDateF}</p>
        <p className='card-text'>Field Address: {league.fieldAddress}</p>
        <p className='card-text'>{league.city}, {league.state} {league.zipcode}</p>

        <button id={league.firebaseKey} className='btn btn-success'>View Teams</button>
        {/* <button id={league.firebaseKey} onClick={onDelete} className='btn btn-danger'>Delete</button> */}
      </div>
    </div>
  );
}
