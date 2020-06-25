import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import ImageBox from './ImageBox';
import ImageModal from './ImageModal';

const ImageGrid = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [imageInfo, setImageInfo] = useState({ title: '', description: '', url: '' });
  const [imageBoxes, setImageBoxes] = useState();

  useEffect(() => {
    axios.get('/api/v1/images/test_grid_data')
    .then(response => {
      setImageBoxes(generateImageBoxes(response.data));
    })
    .catch(error => console.error(error));
  }, []);

  const showModal = (imageData) => {
    setImageInfo(imageData);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const generateImageBoxes = (imageGridData) => {
    return imageGridData.map((imageData, i) => (
      <ImageBox
        key={i}
        imageInfo={imageData}
        handleImageBoxClick={showModal}
      />
    ));
  };

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

export default ImageGrid;
