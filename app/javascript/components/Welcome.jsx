import React from 'react';

const Welcome = () => (
  <h2 className='welcome'>Welcome to {this.props.name}!</h2>
);

Welcome.defaultProps = {
  name: 'default'
};

export default Welcome;
