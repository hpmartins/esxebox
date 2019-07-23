import React from 'react';
import { Admin, Resource } from 'react-admin';
import { authProvider, dataProvider, customRoutes } from './_internal';
import { Login, Layout } from './_layout';
import { Dashboard, SomePage } from './pages';

class App extends React.Component {
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
