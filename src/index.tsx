import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import { store } from './store';
import './i18n';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
