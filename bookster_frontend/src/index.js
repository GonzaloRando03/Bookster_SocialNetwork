import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App';
import './styles/index.css'
import './styles/App.css'
import loginReducer from './reducers/loginReducer';
import errorReducer from './reducers/errorReducer';
import booksReducer from './reducers/booksReducer';


const reducer = combineReducers({
  login: loginReducer,
  errors: errorReducer,
  books: booksReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);