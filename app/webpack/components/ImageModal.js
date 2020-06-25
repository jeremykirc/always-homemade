import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

import { ImageInfoPropType } from '../helpers/shared-prop-types';

const ImageModal = ({ handleClose, imageInfo, show }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className='image-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>{imageInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{imageInfo.description}</Modal.Body>
    </Modal>
  );
};

ImageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  imageInfo: ImageInfoPropType,
  show: PropTypes.bool.isRequired,
};

export default ImageModal;
