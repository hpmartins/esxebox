import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

// Provider
import { authProvider, dataProvider } from './_internal';

// Layout
import { Login, Layout } from './_layout';

// Resources
import { Dashboard, SomePage } from './pages';

// Routes
import { customRoutes } from './_internal';

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
