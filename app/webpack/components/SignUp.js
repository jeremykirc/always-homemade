import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { signUp } from '../api/v1/users';
import { FormContext } from '../context/form-context';

const SignUp = ({ setSessionAndRedirect }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const authenticityToken = useContext(FormContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    signUp({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      password_confirmation: passwordConfirmation,
      authenticity_token: authenticityToken,
    })
    .then(resp => setSessionAndRedirect(resp.data))
    .catch(error => console.error(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md='4' controlId='firstName'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md='4' controlId='lastName'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md='8' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type='email'
            autoComplete='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md='4' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md='4' controlId='passwordConfirmation'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            autoComplete='new-password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs='12'>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

SignUp.propTypes = {
  setSessionAndRedirect: PropTypes.func.isRequired,
};

export default SignUp;
