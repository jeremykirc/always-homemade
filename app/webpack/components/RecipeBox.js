import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';

import ReviewStars from './ReviewStars';
import { RecipePropType } from '../helpers/shared-prop-types';

const RecipeBox = ({ handleRecipeBoxClick, recipe }) => {
  const [favRecipe, setFavRecipe] = useState(false);

  const handleFavRecipe = () => {
    setFavRecipe(!favRecipe);
    // TODO Call backend to favorite/unfavorite the recipe for the user.
  }

  return (
    <Col className='recipe-box-container' sm='6' md='4' lg='3'>
      <div
        style={{ backgroundImage: `url(${recipe['image_url']})` }}
        className='recipe-box'
        onClick={() => handleRecipeBoxClick(recipe)}
      >
      </div>
      <div className='recipe-info'>
        <i className={`${favRecipe ? 'fas' : 'far'} fa-heart fav-recipe-btn`} onClick={handleFavRecipe}></i>
        <div className='recipe-title'>{recipe.title}</div>
        <div className='recipe-desc'>{recipe.description}</div>
        <div className='recipe-author'>{recipe.author}</div>
        <ReviewStars starCount='3.5' />
      </div>
    </Col>
  );
};

RecipeBox.propTypes = {
  handleRecipeBoxClick: PropTypes.func.isRequired,
  recipe: RecipePropType.isRequired,
};

export default RecipeBox;
