import axios from 'axios';

const defaultOptions = {
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export async function signUp(data) {
  return await axios.post('/api/v1/users', data, defaultOptions);
}

export async function login(data) {
  return await axios.post('/api/v1/login', data, defaultOptions);
}

export async function logout() {
  return await axios.delete('/api/v1/logout', defaultOptions);
}

export async function authenticateSession() {
  return await axios.get('/api/v1/authenticate_session', defaultOptions);
}
