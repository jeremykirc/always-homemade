import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

const RecipeInstructionInput = ({ index, value, onChange }) => {
  return (
    <li key={index}>
      <Form.Control
        as='textarea'
        rows='2'
        name='instruction'
        data-index={index}
        defaultValue={value}
        onChange={onChange}>
      </Form.Control>
    </li>
  );
};

RecipeInstructionInput.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RecipeInstructionInput;
