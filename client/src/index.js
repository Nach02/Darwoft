import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from 'react-router-dom' //rooteo de URL´s
import {Provider} from 'react-redux'
import store from './Redux/Store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>   
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

