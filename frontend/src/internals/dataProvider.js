const fetchJson = require('fetch-json');

function httpProvider(baseurl) {
  return (resource, params) => {
      const url = `${baseurl}/${resource}`;
      const options = {headers: new Headers({ Accept: 'application/json' })};
      const token = localStorage.getItem('token');
      options.headers.set('Authorization', `Bearer ${token}`);
      return fetchJson.post(url, params, options);
  };
};

const dataProvider = httpProvider('http://localhost:5000');

export default dataProvider;
