import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './component/authrouter/authrouter';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
           <div>
              <AuthRouter />
              <Route path='/bossinfo' component={BossInfo}></Route>
              <Route path='/geniusinfo' component={GeniusInfo}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
           </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
