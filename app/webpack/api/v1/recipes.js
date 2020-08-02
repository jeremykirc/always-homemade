import axios from 'axios';

import { getCsrfToken } from '../../helpers/form-helper';

export function createRecipe(data) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken();
  return axios.post('/api/v1/recipes', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
