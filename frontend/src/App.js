import React, { Component } from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';

// Providers
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from './_internal';

// Layout
import { Login, Layout } from './_layout';

// Resources
import { Dashboard, SomePage } from './pages';

// Routes
import { customRoutes } from './_internal';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('http://localhost:5000', httpClient);

class App extends Component {

  render() {
    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
      <Admin
          appLayout={Layout}
          dataProvider={dataProvider}
          authProvider={authProvider}
          customRoutes={customRoutes}
          loginPage={Login}
          dashboard={Dashboard}
      >
        <Resource name="asdf" list={SomePage} />
      </Admin>
    );
  }
}

export default App;
