import React from 'react';
import { connect } from 'react-redux';

import { setGroupFilter } from '../actions/filters';

const Filter = ({ displayText, group = '', activeGroup, setGroupFilter }) => {
  const handleSelect = (e) => {
    if (e.key === undefined || e.key === 'Enter') {
      setGroupFilter(group);
    }
  }

  let isActive = group == activeGroup ? 'active' : '';

  return (
    <li tabIndex='0'
        className={isActive}
        onClick={handleSelect}
        onKeyPress={handleSelect}>
      {displayText}
    </li>
  )
}

const mapStateToProps = (state) => ({
  activeGroup: state.filters.group
});

const mapDispatchToProps = (dispatch) => ({
  setGroupFilter: (group) => { dispatch(setGroupFilter(group)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
