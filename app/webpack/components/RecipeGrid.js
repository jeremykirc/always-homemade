import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import RecipeBox from './RecipeBox';
import RecipeModal from './RecipeModal';

const RecipeGrid = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    author: '',
    image_url: ''
  });
  const [recipeBoxes, setrecipeBoxes] = useState();

  useEffect(() => {
    axios.get('/api/v1/recipes')
    .then(response => {
      setrecipeBoxes(generateRecipeBoxes(response.data));
    })
    .catch(error => console.error(error));
  }, []);

  const showModal = (recipe) => {
    setRecipe(recipe);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const generateRecipeBoxes = (recipes) => {
    return recipes.map((recipe, i) => (
      <RecipeBox
        key={i}
        recipe={recipe}
        handleRecipeBoxClick={showModal}
      />
    ));
  };

  return (
    <Container className='recipe-grid'>
      <Row>{recipeBoxes}</Row>
      <RecipeModal
        show={isModalShown}
        recipe={recipe}
        handleClose={hideModal}
      />
    </Container>
  );
};

export default RecipeGrid;
