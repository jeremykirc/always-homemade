import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import ImageBox from './ImageBox';
import ImageModal from './ImageModal';

const ImageGrid = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [recipe, setRecipe] = useState({ title: '', description: '', image_url: '' });
  const [imageBoxes, setImageBoxes] = useState();

  useEffect(() => {
    axios.get('/api/v1/recipes')
    .then(response => {
      setImageBoxes(generateImageBoxes(response.data));
    })
    .catch(error => console.error(error));
  }, []);

  const showModal = (recipe) => {
    setRecipe(recipe);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const generateImageBoxes = (recipes) => {
    return recipes.map((recipe, i) => (
      <ImageBox
        key={i}
        recipe={recipe}
        handleImageBoxClick={showModal}
      />
    ));
  };

  return (
    <Container className='image-grid'>
      <Row>{imageBoxes}</Row>
      <ImageModal
        show={isModalShown}
        recipe={recipe}
        handleClose={hideModal}
      />
    </Container>
  );
};

export default ImageGrid;
