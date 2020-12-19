/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

const AppModal = (props) => {
  const {
    className,
    buttonLabel,
    title,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle} className="mt-2 btn-success">{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{React.cloneElement(props.children, { toggle })}</ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;
