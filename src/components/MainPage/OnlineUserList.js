import React, { Component } from 'react';
import { Table } from 'antd';
import { Button, Radio, Icon } from 'antd';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        dataSource : [{
            key: '1',
            name: 'Mike',
          }, {
            key: '2',
            name: 'John',
          }], 
        guestid: this.props.guestid,

        };
}
  /*
  componentDidMount() {
    this.props.fetchAllUserList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userList: nextProps.list });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.userList !== nextState.userList; 
  }
  */

    handleSizeChange = (e) => {
    this.setState({ list: e.target.value });
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
            <Table style={{background: 'white', color: 'black',textAlign:'center'}}
            dataSource={ this.state.dataSource}
            columns={ onColumns }
          />
        </div>
        </div>
    );
  }
}
export default UserList;