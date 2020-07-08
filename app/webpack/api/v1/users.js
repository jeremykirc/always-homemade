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

export async function signIn(data) {
  return await axios.post('/api/v1/login', data, defaultOptions);
}

export async function authenticateSession() {
  return await axios.get('/api/v1/authenticate_session', defaultOptions);
}
