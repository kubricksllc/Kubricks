import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from  './js/App.jsx';
import Store from './store'   

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);