// eslint-disable-next-line import/no-extraneous-dependencies, global-require
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store';
import './assets/style/base.css'

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <Root />
  </Provider>,
  document.getElementById('root'),
);
