import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import RecipeBox from './RecipeBox';
import RecipeGridFilterList from './RecipeGridFilterList';
import RecipeModal from './RecipeModal';
import Preloader from './Preloader';
import getFilteredRecipes from '../selectors/recipes';
import { setRecipes } from '../actions/recipes';
import { loaded } from '../actions/preloader';

const RecipeGrid = ({ recipes, filters, preloader, dispatch }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({
    title: '',
    description: '',
    author: {
      id: '',
      display_name: '',
    },
    image_url: ''
  });

  useEffect(() => {
    axios.get('/api/v1/recipes')
    .then(response => {
      dispatch(loaded());
      dispatch(setRecipes(response.data));
    })
    .catch(error => console.error(error));
  }, []);

  const showModal = (recipe) => {
    setActiveRecipe(recipe);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const recipeBoxes = () => {
    let filteredRecipes = getFilteredRecipes(recipes, filters);
    return filteredRecipes.map((recipe, i) => (
      <RecipeBox
        key={i}
        recipe={recipe}
        handleRecipeBoxClick={showModal}
      />
    ));
  };

  return (
    <Container className='recipe-grid'>
      <RecipeGridFilterList />
      {preloader.visible && <Preloader />}
      <Row>{recipeBoxes()}</Row>
      <RecipeModal
        show={isModalShown}
        recipe={activeRecipe}
        handleClose={hideModal}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  preloader: state.preloader,
  recipes: state.recipes,
  filters: state.filters
});

export default connect(mapStateToProps)(RecipeGrid);
