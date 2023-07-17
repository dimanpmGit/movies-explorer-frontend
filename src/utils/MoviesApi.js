import { BEATFILM_MOVIES_URL } from './constants';

export const getMovies = () => {
  return fetch(BEATFILM_MOVIES_URL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch(err => console.log(err));
}