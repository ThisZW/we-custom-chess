import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configure from '../redux/store/configureStore';
import UserList from '../containers/User/UserList';
import LoginForm from '../containers/Home/Login';
import RegisterForm from '../containers/Home/Register';
import NotFound from '../common/NotFound/NotFound';
import CatchTheLionBoard from '../components/Game/CatchTheLion';
import Main from '../components/MainPage/Main';
import Board from '../components/CreateGameBoard/Board';
import {Layout} from 'antd';


const history = createBrowserHistory();
const store = configure();

class RootRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
        <Layout>
          <Layout.Header style={{minHeight:'100h', color: 'white',textAlign: 'center',fontSize:25}}>
            We Custome Chess
          </Layout.Header>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/userList' component={UserList} /> 
            <Route path='/notFound' component={NotFound} />
            <Route path='/chasethelion' component={CatchTheLionBoard} />
            <Route path='/Board' component={Board} />
            <Redirect from='' to="/notFound" />
          </Switch>
          <Layout.Footer style={{background:"white", borderTop: "1px black solid"}}>
            Project @ ctp2018
          </Layout.Footer>
        </Layout>
        </Router>
      </Provider>
    );
  }
}

export default RootRouter;