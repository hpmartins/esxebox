import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './internal/serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
registerServiceWorker();
