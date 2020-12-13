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
      <Button color="danger" onClick={toggle} className="mt-5">{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;
