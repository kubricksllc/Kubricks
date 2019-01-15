import React from 'react';
import { render } from 'react-dom';
import App from  './App.jsx';
import { Provider } from 'react-redux';
import Store from '../store'   

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);