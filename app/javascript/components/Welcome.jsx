import React from 'react'
import ReactDOM from 'react-dom'

const Welcome = props => (
  <h2 class='welcome'>Welcome to {props.name}!</h2>
)

Welcome.defaultProps = {
  name: 'default'
}

export default Welcome
