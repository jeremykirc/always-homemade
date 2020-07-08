import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { setTextFilter } from '../actions/filters';

const Search = ({ text, setTextFilter }) => {
  const handleChange = (e) => {
    setTextFilter(e.target.value)
  }

  return (
    <Form.Control type='text' placeholder='Filter recipes...' value={text} onChange={handleChange}></Form.Control>
  )
}

const mapStateToProps = (state) => ({
  text: state.filters.text
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => { dispatch(setTextFilter(text)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
