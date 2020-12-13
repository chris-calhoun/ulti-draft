import React from 'react';
import CreateDraftBtn from '../components/Modal/loginModal';
import AppModal from '../components/Modal/appModal';
import JoinDraftForm from '../components/Forms/JoinDraftForm';

export default function Home(props) {
  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <CreateDraftBtn authed={props.authed} />
        <AppModal title={'Enter code to join draft'} buttonLabel={'join draft'}><JoinDraftForm /></AppModal>
      </div>
    </div>
  );
}
