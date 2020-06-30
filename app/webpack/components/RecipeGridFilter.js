import React from 'react';
import { connect } from 'react-redux';

import { setGroupFilter } from '../actions/filters';

const Filter = ({ displayText, group = '', activeGroup, dispatch }) => {
  const handleSelect = (e) => {
    if (e.key === undefined || e.key === 'Enter')
    dispatch(setGroupFilter(group));
  }

  let isActive = group == activeGroup ? 'active' : '';

  return (
    <li tabIndex='0' className={isActive} onClick={handleSelect} onKeyPress={handleSelect}>{displayText}</li>
  )
}

const mapStateToProps = (state) => ({
  activeGroup: state.filters.group
});

export default connect(mapStateToProps)(Filter);
