import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { setTextFilter } from '../actions/filters';

const Search = ({ text, dispatch }) => {
  const handleChange = (e) => {
    dispatch(setTextFilter(e.target.value))
  }

  return (
    <Form.Control type='text' placeholder='Filter recipes...' value={text} onChange={handleChange}></Form.Control>
  )
}

const mapStateToProps = (state) => ({
  text: state.filters.text
});

export default connect(mapStateToProps)(Search);
