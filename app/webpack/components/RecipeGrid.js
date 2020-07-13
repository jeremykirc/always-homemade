import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loaded } from '../actions/preloader';
import { setRecipes } from '../actions/recipes';
import getFilteredRecipes from '../selectors/recipes';
import Preloader from './Preloader';
import RecipeBox from './RecipeBox';
import RecipeGridFilterList from './RecipeGridFilterList';
import RecipeModal from './RecipeModal';

const RecipeGrid = ({ user, recipes, filters, preloader, setRecipesDispatch }) => {
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
    .then(resp => { setRecipesDispatch(resp.data); })
    .catch(error => { console.error(error); });
  }, []);

  const showModal = (recipe) => {
    setActiveRecipe(recipe);
    setIsModalShown(true);
  };

  const hideModal = () => setIsModalShown(false);

  const recipeBoxes = () => {
    let filteredRecipes = getFilteredRecipes(recipes, filters, user);
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
  user: state.session.user,
  preloader: state.preloader,
  recipes: state.recipes,
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setRecipesDispatch: (recipes) => {
    dispatch(setRecipes(recipes));
    dispatch(loaded());
  },
});

RecipeGrid.propTypes = {
  user: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  preloader: PropTypes.object.isRequired,
  setRecipesDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGrid);
