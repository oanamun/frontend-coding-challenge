import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Tournaments from './screens/tournaments';

const container = document.getElementById('root');

if (!container) {
  throw new Error('No container found');
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Tournaments />
  </Provider>
);
