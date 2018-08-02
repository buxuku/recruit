import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import AutoRouter from './component/authrouter/authrouter';
import AuthRouter from './component/authrouter/authrouter';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
))

function Boss () {
  return <h2>Boss</h2>
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
           <div>
              <AuthRouter />
              <Route path='/boss' component={Boss}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
           </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
