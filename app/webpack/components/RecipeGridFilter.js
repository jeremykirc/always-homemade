import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { setGroupFilter } from '../actions/filters';

const Filter = ({ displayText, group = '', activeGroup, setGroupFilterDispatch }) => {
  const handleSelect = (e) => {
    if (e.key === undefined || e.key === 'Enter') {
      setGroupFilterDispatch(group);
    }
  };

  let isActive = group == activeGroup ? 'active' : '';

  return (
    <li tabIndex='0'
        className={isActive}
        onClick={handleSelect}
        onKeyPress={handleSelect}>
      {displayText}
    </li>
  );
};

const mapStateToProps = (state) => ({
  activeGroup: state.filters.group
});

const mapDispatchToProps = (dispatch) => ({
  setGroupFilterDispatch: (group) => { dispatch(setGroupFilter(group)); }
});

Filter.propTypes = {
  displayText: PropTypes.string.isRequired,
  group: PropTypes.string,
  activeGroup: PropTypes.string.isRequired,
  setGroupFilterDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
