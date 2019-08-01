import jwtDecode from 'jwt-decode';
const fetchJson = require('fetch-json');

function httpProvider(baseurl) {
  return (resource, params) => {
      const url = `${baseurl}/${resource}`;
      const myInit = {
          body: JSON.stringify(params),
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          mode: 'cors',
      }
      const token = localStorage.getItem('token');
      if (token) {
          myInit.headers.Authorization = `Bearer ${token}`;
      }
      return fetch(url, myInit).then(resp => resp.json()).catch(e => e.json());
  };
};

export default httpProvider(process.env.REACT_APP_API_URL);
