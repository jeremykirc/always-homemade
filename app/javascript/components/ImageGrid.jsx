import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import { ImageInfoPropType } from '../helpers/shared-prop-types';
import ImageBox from './ImageBox';
import ImageModal from './ImageModal';

const ImageGrid = ({ imageGridData }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  const showModal = (imageData) => {
    setImageInfo(imageData);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const imageBoxes = imageGridData.map((imageData, i) => (
    <ImageBox
      key={i}
      imageInfo={imageData}
      handleImageBoxClick={showModal}
    />
  ));

  return (
    <Container className='image-grid'>
      <Row>{imageBoxes}</Row>
      <ImageModal
        show={isModalShown}
        imageInfo={imageInfo}
        handleClose={hideModal}
      />
    </Container>
  );
};

ImageGrid.propTypes = {
  imageGridData: PropTypes.arrayOf(ImageInfoPropType).isRequired,
};

export default ImageGrid;