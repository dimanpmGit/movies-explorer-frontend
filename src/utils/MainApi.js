import { BASE_URL } from "./constants";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((response) => {
      try {
        if (response.status === 201) {
          //return response.json();
          return authorize(email, password);
        }
      }
      catch (e) {
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('jwt', data.token);
        return "data";
      }      
    })
    .catch((err) => console.log(err));
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: `Bearer ${localStorage.getItem('jwt')}`
  })
}