import React from 'react';
import DraftDetailsForm from '../../components/Forms/DraftDetailsForm';

export default function CreateDraft({ authed }) {
  return (
    <>
    <h1 className="my-5">Create Draft</h1>
    <div className='createDraftForm'>
      <DraftDetailsForm authed={authed}/>
    </div>
    </>
  );
}
