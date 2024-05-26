import { BEATFILM_MOVIES_URL, ERR_MSG_WHEN_NO_SERVER } from './constants';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(ERR_MSG_WHEN_NO_SERVER));
}

export const getMovies = () => {
  return fetch(BEATFILM_MOVIES_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res) => handleResponse(res))
  .then((data) => {
    return data;
  })
  .catch(err => err);
}

