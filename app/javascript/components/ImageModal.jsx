import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ImageModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className='image-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.imageInfo['title']}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.imageInfo['description']}</Modal.Body>
    </Modal>
  );
};

export default ImageModal;
