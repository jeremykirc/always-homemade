import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setTextFilter } from '../actions/filters';

const Search = ({ text, setTextFilterDispatch }) => {
  const handleChange = (e) => {
    setTextFilterDispatch(e.target.value);
  };

  return (
    <Form.Control type='text' placeholder='Filter recipes...' value={text} onChange={handleChange}></Form.Control>
  );
};

const mapStateToProps = (state) => ({
  text: state.filters.text
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilterDispatch: (text) => { dispatch(setTextFilter(text)); }
});

Search.propTypes = {
  text: PropTypes.string.isRequired,
  setTextFilterDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
