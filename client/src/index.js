import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/configureStore'
import './index.css';
import AppRouter from './routers/AppRouter';

const JSX = (
  <Provider store={store}>
    <AppRouter /> 
  </Provider>
)


ReactDOM.render(
  <React.StrictMode>
    {JSX}
  </React.StrictMode>,
  document.getElementById('root')
);
