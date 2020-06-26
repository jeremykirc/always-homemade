import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

import { RecipePropType } from '../helpers/shared-prop-types';

const ImageModal = ({ handleClose, recipe, show }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className='image-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{recipe.description}</Modal.Body>
    </Modal>
  );
};

ImageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  recipe: RecipePropType,
  show: PropTypes.bool.isRequired,
};

export default ImageModal;
