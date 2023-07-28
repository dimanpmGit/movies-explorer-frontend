import { BASE_URL, ERR_MSG_WHEN_NO_SERVER } from "./constants";

const handleResponse = (res) => {
  return res.json();
}

export const getErrorMessage = (data) => {
  //Если проблема с отправкой запроса на сервер, выводим ошибку
  if (data.message.toLowerCase().includes('Failed to fetch'.toLowerCase())) {
    return ERR_MSG_WHEN_NO_SERVER;
  }
  return data.message;
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => res.json())
    .then(data => data)
    .catch(err => err)
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
    .then((res) => handleResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      else {
        return data;
      }
    })
    .catch((err) => err);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => handleResponse(res))
    .then(data => {
      if (data.message) {
        return [];
      }
      return data;
    })
    .catch(err => err);
}

export const updateUser = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email })
  })
    .then((res) => res.json())
    .then(data => data)
    .catch(err => err)
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => handleResponse(res))
    .then(data => {
      if (data.message) {
        return [];
      }
      return data;
    })
    .catch((err) => err);
}

export const saveMovie = (movieData) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(movieData)
  })
    .then((res) => handleResponse(res))
    .then(data => {
      if (data.message) {
        return [];
      }
      return data;
    })
    .catch(err => err);
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => handleResponse(res))
    .then(data => {
      if (data.message) {
        return [];
      }
      return data;
    })
    .catch(err => err);
}