import React, { Component } from 'react';
import { Table } from 'antd';
import { Button, Radio, Icon,InputNumber } from 'antd';
import { timingSafeEqual } from 'crypto';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }

  handleSizeChange = (e) => {
    this.setState({ list: e.target.value });
  }

  onChange(value) {
    this.props.callbackFromParent(value);
  }

  render() {
      const onColumns = [{
        title: 'Online List',
        dataIndex: 'name',
        key: 'name',
        color: 'white',
      }];
    
    return (
        <div>
        <div style={{color:'white',textAlign:'center',fontSize:20,color:'black'}}>
        {this.state.guestid}
        </div>
        <div>
        </div>
        </div>
    );
  }
}
export default UserList;