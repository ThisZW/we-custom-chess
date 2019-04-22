import React, { Component } from 'react';
import { Table } from 'antd';
import {Icon,Popconfirm } from 'antd';
import { connect } from 'react-redux';
import * as cSocket from '../socket/ConfirmSocket'
import { getGuestId } from '../redux/reducers/userStatus'

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      onlineUsers : [{'userId':'test'}],
    };

    cSocket.receiveUsers((err,onlineUsers) => this.updateUsers(onlineUsers)
    );
}
  
  componentWillReceiveProps = (props) => {
    this.setState({
      ...props
    })
  }

  updateUsers(data){
    console.log(data);
    var id = this.props.guestId
    var tmp =[]
    var y = 0
    for (var i = 0; i < data.length; i++) {
      if(data[i].userId !=id ){
        tmp.push({key:y.toString(),userId:data[i].userId})
        y++;
      }
    } 
    console.log(tmp)
    this.setState({onlineUsers:tmp})
  }

  showUser(){
    console.log('hi')
    console.log(this.state.onlineUsers)
    //this.props.invite(text.name)
  }



  render() {
      const onColumns = [{
        title: 'Online List',
        dataIndex: 'userId',
        color: 'white',
      },
      { title: 'Acition', dataIndex: '', key: 'operation' ,render: (text,record,index)=>(
        <span>
        <Popconfirm title="sure invite?" onConfirm={() => cSocket.sendInvite(text.userId)}>
          <button>
              <Icon type="user-add"/></button>
        </Popconfirm>
      </span>        
    ) },

    ];
    
    return (

        <div>
            <Table style={{background: 'white', color: 'black',textAlign:'center'}}
            dataSource={ this.state.onlineUsers}
            columns={ onColumns }
            
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
  {  }
)(UsersList)
