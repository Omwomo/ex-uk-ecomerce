import "@hotwired/turbo-rails";
import { Provider } from 'react-redux';
import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <h1>Greetings from Eugene :</h1>
    <App />
  </Provider>
);
