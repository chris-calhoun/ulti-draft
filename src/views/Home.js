import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Home(props) {
  const loginModal = () => {
    !props.authed ? console.warn('log in please')
      : console.warn('already logged in');
  };

  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <Button tag={Link} to='/create-draft' onClick={ loginModal } className='draftBtns btn-block' color="success">create draft</Button>
        <Button className='draftBtns btn-block' color="success">join draft</Button>
      </div>
    </div>
  );
}
