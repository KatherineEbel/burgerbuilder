import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers/burgerBuilder';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// const logger = store => {
//   return next => {
//     return action => {
//       console.log('[Middleware] Dispatching', action);
//       const result = next(action);
//       console.log('[Middleware] next state', store.getState());
//       return result;
//     }
//   };
// };

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
