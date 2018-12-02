import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { Button, Layout } from 'antd'; 
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
import OnlineUserList from './OnlineUserList';

const {Header, Footer, Sider, Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user : this.props.user,
      logined: false,
      guestid : "",
      case: '0'
    }
  }
  
  componentDidMount() {
    if(this.state.guestid === ""){
      this.setState({ guestid: Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 7)});
    }
  }

  handleCaseChange = (e) => {
    this.setState({ case: e.target.value });
  }

  render() {
    return (
      <Layout>
        <Header style={{minHeight:'100h', color: 'white',textAlign: 'center',fontSize:25}}>
          We Custome Chess
        </Header>
        <Layout style={{height:'1000px'}} >
        <Content width="80%" style={{minHeight:'1000h', margin: '24px 16px 0',alignItems:'center',display:'flex',justifyContent:'center'}}>
          <Link to='/userList'><Button type='primary'>joint a game room</Button></Link>
          <Link to='/Board'><Button type='primary'>Create game</Button></Link>
        </Content>

        <Sider width="20%" style={{background: 'white', color: 'black',textAlign:'center',fontSize:20}}>
        <OnlineUserList />
        </Sider>

        </Layout>

      </Layout>
    );
  }
}
export default hot(module)(App);
