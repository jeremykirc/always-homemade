import React, { useState, useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { login } from '../api/v1/users';
import { FormContext } from '../context/form-context';

const Login = ({ setSessionAndRedirect }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authenticityToken = useContext(FormContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      email,
      password,
      authenticity_token: authenticityToken
    })
    .then(resp => setSessionAndRedirect(resp.data))
    .catch(error => console.error(error))
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md='4' controlId='email'>
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
            autoComplete='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default Login;
