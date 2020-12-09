import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
// import AppModal from '../components/Modal';

export default function Home(props) {
  const history = useHistory();
  const navigateToCreate = () => history.push('/create-draft');

  const handleCreateBtnClick = () => {
    // if not logged in, show modal with login button
    !props.authed ? console.warn('log in bish')
    // else, continue onto create draft view
      : navigateToCreate();
  };

  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <Button onClick={ handleCreateBtnClick } className='draftBtns btn-block' color="success">create draft</Button>
        <Button className='draftBtns btn-block' color="success">join draft</Button>
      </div>
    </div>
  );
}
