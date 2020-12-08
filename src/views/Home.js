import React from 'react';
import { Button } from 'reactstrap';

export default function Home() {
  return (
    <div className='home'>
      <h1 className='title mb-5'>ulti.draft</h1>
      <div className='homeBtns'>
        <Button className='draftBtns btn-block' color="success">create draft</Button>{' '}
        <Button className='draftBtns btn-block' color="success">join draft</Button>{' '}
      </div>
    </div>
  );
}
