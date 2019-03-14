import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configure from '../redux/store/configureStore';
import { hot } from 'react-hot-loader'
import UserList from '../containers/User/UserList';
import NotFound from '../common/NotFound/NotFound';
import {Layout} from 'antd';
import AcceptInvites from '../components/AcceptInvites';

import {CreateBoardPage, GamePlayingPage, MainPage} from '../pages';

const history = createBrowserHistory();
const store = configure();

class RootRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
        <Layout>
          <Layout.Header style={{minHeight:'100h', color: 'white',textAlign: 'center',fontSize:25}}>
            We Custom Emoji Chess
          </Layout.Header>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/user-list' component={UserList} /> 
            <Route path='/notFound' component={NotFound} />
            <Route path='/game-in-progress' component={GamePlayingPage} />
            <Route path='/create-board' component={CreateBoardPage} />
            <Redirect from='' to="/notFound" />
          </Switch>
          <Layout.Footer style={{background:"white", borderTop: "1px black solid"}}>
            Project @ ctp2018
          </Layout.Footer>
          <AcceptInvites/>
        </Layout>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(RootRouter);