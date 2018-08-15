import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './component/authrouter/authrouter';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

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
              <Switch>
              <Route path='/bossinfo' component={BossInfo}></Route>
              <Route path='/geniusinfo' component={GeniusInfo}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/chat/:id' component={Chat}></Route>
              <Route component={Dashboard}></Route>
              </Switch>
           </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
