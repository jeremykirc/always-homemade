import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-bootstrap';

import { RecipePropType } from '../helpers/shared-prop-types';

const RecipeBox = ({ handleRecipeBoxClick, recipe }) => (
  <Col className='image-box-container' sm='6' md='4' lg='3'>
    <div
      style={{ backgroundImage: `url(${recipe['image_url']})` }}
      className='image-box'
      onClick={() => handleRecipeBoxClick(recipe)}
    >
    </div>
    <div className='image-info'>
      <div className='image-title'>{recipe.title}</div>
      <div className='image-desc'>{recipe.description}</div>
    </div>
  </Col>
);

RecipeBox.propTypes = {
  handleRecipeBoxClick: PropTypes.func.isRequired,
  recipe: RecipePropType.isRequired,
};

export default RecipeBox;
