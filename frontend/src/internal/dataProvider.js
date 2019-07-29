// import { authService } from './authService';
const fetchJson = require('fetch-json');

function httpProvider(baseurl) {
  return (resource, params) => {
      const url = `${baseurl}/${resource}`;
      // const options = {headers: new Headers({ Accept: 'application/json' })};
      // const currentUser = authService.currentUserValue;
      // if (currentUser && currentUser.token) {
      //   options.headers.set('Authorization', `Bearer ${currentUser.token}`);
      // }
      return fetchJson.post(url, params);
  };
};

export default httpProvider(process.env.REACT_APP_API_URL);
