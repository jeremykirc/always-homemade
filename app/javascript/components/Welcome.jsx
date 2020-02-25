import React from 'react'

class Welcome extends React.Component {
  render() {
    return <h2 className='welcome'>Welcome to {this.props.name}!</h2>;
  }
}

Welcome.defaultProps = {
  name: 'default'
};
export default Welcome
