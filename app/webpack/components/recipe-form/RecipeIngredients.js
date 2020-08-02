import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

const RecipeIngredients = ({ addNewIngredient, ingredients, removeIngredient, updateIngredient }) => (
  <>
    <ListGroup>
      {ingredients.map(({ name: ingredientName, quantity, unit }, index) => (
        <ListGroupItem key={index}>
          <Button
            onClick={() => removeIngredient(index)}
            variant="link"
            className="float-right"
          >
            <i className="fas fa-times text-secondary" aria-hidden />
          </Button>
          <Form.Row>
            <Form.Group as={Col} lg="4" xs="12" controlId={`ingredient-quantity-input-${index}`}>
            <Form.Label column="sm">Amount</Form.Label>
              <Form.Control
                className="ingredient-quantity-input"
                defaultValue={quantity}
                required
                type="number"
                step="any"
                onChange={(e) => updateIngredient(index, {
                  name: ingredientName,
                  quantity: Number(e.target.value),
                  unit,
                })}>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} lg="4" xs="12" controlId={`ingredient-unit-input-${index}`}>
              <Form.Label column="sm">Unit</Form.Label>
              <Form.Control
                className="ingredient-unit-input"
                defaultValue={unit}
                onChange={(e) => updateIngredient(index, {
                  name: ingredientName,
                  quantity,
                  unit: e.target.value,
                })}>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} lg="4" xs="12" controlId={`ingredient-name-input-${index}`}>
              <Form.Label column="sm">Ingredient</Form.Label>
              <Form.Control
                className="ingredient-name-input"
                required
                defaultValue={ingredientName}
                onChange={(e) => updateIngredient(index, {
                  name: e.target.value,
                  quantity,
                  unit,
                })}>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </ListGroupItem>
      ))}
    </ListGroup>
    <i className="fas fa-plus-square add-btn" tabIndex="0" onClick={addNewIngredient}></i>
  </>
);

RecipeIngredients.propTypes = {
  addNewIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  })).isRequired,
  removeIngredient: PropTypes.func.isRequired,
  updateIngredient: PropTypes.func.isRequired,
};

export default RecipeIngredients;
