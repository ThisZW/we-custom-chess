import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { Button, Layout,Input, Modal, Row} from 'antd'; 
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
import OnlineUserList from './OnlineUserList';
import CustomeGame from './../Game/CatchTheLion';

const confirm = Modal.confirm;

import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://localhost:3003');

const {Header, Footer, Sider, Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestid : '',
      case: '0',
      messages : '',
      users:'',
      opponent:'',
      opponentid:'',
      inviting: false,
      acceptingInvite: false,
      Gamingtime:false,
      player:'',
      turn:true,
      chessBoard:[
        {row: 2, col: 2, chess: "hi", player: "b", alive: true},
        {row: 2, col: 3, chess: "ou", player: "b", alive: true},
        {row: 2, col: 4, chess: "kaku", player: "b", alive: true},
        {row: 3, col: 3, chess: "fu", player: "b", alive: true},
        {row: 4, col: 3, chess: "fu", player: "a", alive: true},
        {row: 5, col: 2, chess: "hi", player: "a", alive: true},
        {row: 5, col: 3, chess: "ou", player: "a", alive: true},
        {row: 5, col: 4, chess: "kaku", player: "a", alive: true},
      ]
    }

    const updateBoard = (data)=>{
      this.setState({chessBoard:data})
    }

    socket.on('userExists', function(data) {
      existUser(data)
    })


    socket.on('receive pm', function(board) {
      console.log(board)
      updateBoard(board)
      updateturn()
    })


    socket.on('users', function(data) {
      updpateUsers(data)
    })


    socket.on('reveiveInvite', function(sender) {
      if(checkInvite() === false){
        updateInvite(true)
        confirm({
          title: 'Invite',
          content: `player${sender.name} want to play chess with you?`,
          onOk() {
            updateOpponent(sender)
            console.log(`${socket.name} accept ${sender.name} invite`)
            socket.emit('accept',sender);
            updateInvite(false)
            updateGaming(true)
            updatePlayer('b')
            
          },
          onCancel() {
          socket.emit('not accept',sender);
          updateInvite(false)
          updateGaming(false)
        },
        }) 
      }
    })

    const updateturn=()=>{
      this.setState({turn:!this.state.turn})
    }

    const updatePlayer=(data)=>{
      this.setState({player:data})
    }

    const checkInvite=()=>{
      return this.state.inviting
    }

    const updateGaming=(data)=>{
      this.setState({Gamingtime:data})
    }

    const updateInvite=(data)=>{
      this.setState({acceptingInvite:data})
    }

    const updateOpponent=(data)=>{
      this.setState({opponent:data.name,opponentid:data.id})
    }

    const updateInviting=(data)=>{
      this.setState({inviting:data})
    }
    
    socket.on('accept', function(sender) {
      updateOpponent(sender)
      updateInviting(true)
      updateGaming(true)
      updatePlayer('a')
      console.log("game accept")
    })

    socket.on('not accept', function(sender) {
      updateOpponent('')
      updateInviting(false)
      console.log("game false")
    })

    const updpateUsers=(data)=>{
      console.log(data);
      var tmp =[]
      var y = 0
      for (var i = 0; i < data.length; i++) {
        if(data[i].userId !=this.state.guestid ){
          tmp.push({key:y.toString(),name:data[i].userId})
          y++;
        }
      } 
      this.setState({users:tmp})
    }
   const existUser=(data)=>{
    this.setState({guestid:'change to other name'})
  }

  }

  componentDidMount() {
    if(this.state.guestid === ''){
      var tmpname = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 7)
      this.setState({ guestid: tmpname,
      invite:false,
      inviting:false});
      socket.emit('changeUserName', tmpname);
    }
  }


 submitGuestID=()=>{
  socket.emit('changeUserName', this.state.guestid);
  console.log(this.state.guestid);
}

  handleCaseChange = (e) => {
    this.setState({ case: e.target.value });
  }


  handleGuestIDChange = (e) =>{
    this.setState({guestid:e.target.value})

  }


  sendBoard=(board)=>{
    this.setState({turn:!this.state.turn})
    socket.emit('private message',this.state.opponentid,board)
  }


  callcomfrim=(to)=>{
    if(this.state.inviting === false){
      console.log("hi")
      socket.emit('send invite',to)
      this.setState({inviting:true})
    }
  }

  render() {
    return (
      <Layout style={{height:'1000px'}} >
          {
          (this.state.Gamingtime)? 

          ( <Content width="80%"> 
              <CustomeGame chessBoard={this.state.chessBoard}  rowCount={6} colCount={5} turn={(this.state.turn)?'a':'b'} 
              player={this.state.player}
              sendBoard={this.sendBoard}/>
          </Content>
          )
           :( 
          <Content width="80%" style={{minHeight:'1000h', margin: '24px 16px 0',alignItems:'center',display:'flex',justifyContent:'center'}}>
            <Link to='/userList'><Button type='primary'>joint a game room</Button></Link>&nbsp;
            <Link to='/Board'><Button type='primary'>Create game</Button></Link>
          </Content>
            )
        }
        
      <Sider width="200" style={{background: 'white', color: 'black',textAlign:'center',fontSize:20}}>
      {
          (this.state.Gamingtime)?(
            <div >
              <div height="200px" style={{height:"200px"}}>
              <div>
              Player {this.state.player}:
              </div>
              {this.state.guestid}
              </div>
              <div style={{height:"200px"}}>
              <div>player 2:</div>
              {this.state.opponent}</div>
              <div>current turn: {(this.state.turn)? 'a':'b'}</div>
            </div>


          ):(<div>
        <div style={{color:'white',textAlign:'center',fontSize:20,color:'black'}}>
        <Row>
          <Input value={this.state.guestid} style={{margin:"10px, 10px 0 10px"}}  onChange={this.handleGuestIDChange} />
          <Button size="small"  onClick={this.submitGuestID}>Change Username</Button>
        </Row>
        </div>
      <OnlineUserList users={this.state.users} invite={this.callcomfrim}/>
      </div>)
        }

      </Sider>
      </Layout>
    );
  }
}
export default hot(module)(App);
