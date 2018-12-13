import React, { Component } from 'react';
import { Table } from 'antd';
import { Button, Radio, Icon,Popconfirm } from 'antd';
import user from '../../redux/reducers/user/index';

import SocketIOClient from 'socket.io-client';
const socket = SocketIOClient('http://localhost:3003');

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        users : [],
        };
}
  
  componentDidMount() {
    if (this.state.users !== this.props.users) {
      this.setState({users:this.props.users});
      console.log(this.state.users)
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.state.users !== nextProps.users) {
        this.setState({users:nextProps.users});
        this.forceUpdate();
      }
  }

  render() {
      const onColumns = [{
        title: 'Online List',
        dataIndex: 'name',
        color: 'white',
      },
      { title: 'Acition', dataIndex: '', key: 'operation' ,render: (text,record,index)=>(
        <span>
        <Popconfirm title="sure invite?" onConfirm={() => this.props.invite(text.name)}>
          <button>
              <Icon type="user-add"/></button>
        </Popconfirm>
      </span>        
    ) },

    ];
    
    return (

        <div>
            <Table style={{background: 'white', color: 'black',textAlign:'center'}}
            dataSource={ this.state.users}
            columns={ onColumns }
            
          />
        </div>
    );
  }
}
export default UserList;