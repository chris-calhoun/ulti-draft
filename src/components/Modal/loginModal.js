/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AuthData from '../../helpers/data/authData';

const CreateDraftBtn = (props) => {
  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const history = useHistory();
  const navigateToCreate = () => history.push('/create-draft');

  const handleCreateBtnClick = () => {
    // if not logged in, show modal with login button
    !props.authed ? toggle()
    // else, continue onto create draft view
      : navigateToCreate();
  };

  return (
    <div>
      <Button color="success" onClick={handleCreateBtnClick}>create draft</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Sign in to create draft</ModalHeader>
        <ModalBody>
        <button className='nav-link btn btn-primary' onClick={AuthData.loginClickEvent}>Login</button>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateDraftBtn;
