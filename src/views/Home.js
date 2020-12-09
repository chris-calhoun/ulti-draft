import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
  const history = useHistory();
  const navigateToCreate = () => history.push('/create-draft');

  const loginModal = () => {
    // if not logged in, show modal with login button
    !props.authed ? console.warn('log in please')
    // else, continue onto create draft
      : navigateToCreate();
  };

  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <Button onClick={ loginModal } className='draftBtns btn-block' color="success">create draft</Button>
        {/* <Button tag={Link} to='/create-draft' onClick={ loginModal } className='draftBtns btn-block' color="success">create draft</Button> */}
        <Button className='draftBtns btn-block' color="success">join draft</Button>
      </div>
    </div>
  );
}
