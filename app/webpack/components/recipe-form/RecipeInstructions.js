import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

const RecipeInstructions = ({ addNewInstruction, instructions, updateInstruction }) => (
  <>
    <ol>
      {instructions.map((value, index) => (
        <li key={index}>
          <Form.Control
            className="instruction-input"
            as="textarea"
            rows="2"
            name="instruction"
            defaultValue={value}
            onChange={(e) => updateInstruction(index, e.target.value)}>
          </Form.Control>
        </li>
      ))}
    </ol>
    <i className='fas fa-plus-square add-btn' tabIndex='0' onClick={addNewInstruction}></i>
  </>
);

RecipeInstructions.propTypes = {
  addNewInstruction: PropTypes.func.isRequired,
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateInstruction: PropTypes.func.isRequired,
};

export default RecipeInstructions;
