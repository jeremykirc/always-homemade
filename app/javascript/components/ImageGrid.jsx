import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap/Container';

import ImageBox from './ImageBox';
import ImageModal from './ImageModal';

const ImageGrid = ({ imageGridData }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  const showModal = (imageInfo) => {
    setImageInfo(imageInfo);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const imageBoxes = imageGridData.map((data, i) => (
    <ImageBox
      key={i}
      imageInfo={data}
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
  imageGridData: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export default ImageGrid;