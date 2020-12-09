import React from 'react';
import { Button } from 'reactstrap';
import CreateDraftBtn from '../components/Modal/loginModal';

export default function Home(props) {
  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <CreateDraftBtn authed={props.authed} />
        <Button className='draftBtns btn-block' color="success">join draft</Button>
      </div>
    </div>
  );
}
