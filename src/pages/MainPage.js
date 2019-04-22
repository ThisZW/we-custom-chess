import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout,Input, Row,Modal} from 'antd'; 
import { setGuestId} from '../redux/actions/UserStatus'
import{setGameInfo} from '../redux/actions/Game'
import OnlineUserList from '../components/OnlineUserList'
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
const confirm = Modal.confirm;
const {Header, Footer, Sider, Content} = Layout;


//testing calling function
import * as cSocket from '../socket/ConfirmSocket'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestId : '',
      case: '0',
      messages : '',
      inviting: false,
      acceptingInvite: false,
      gamingTime:false,
      player:'',
      turn:true,
    }

    cSocket.repeatedUserName((err,onlineUsers) => this.setState({guestId:'set to other name'}))
    
    cSocket.receiveInvite((err,sender) => openConfirm(sender))
    
    cSocket.accept((err,sender) => acceptInvite('a',sender))

    const acceptInvite=(turn,opponentId)=>{
      var gameInfo ={
        guestId:this.state.guestId,
        opponent:opponentId.name,
        opponentId:opponentId.id,
        player:turn,
        gamingTime:true,
        inviting:true};
      var tmp = JSON.stringify(gameInfo)
      localStorage.setItem('gameInfo',tmp);
      this.props.history.push('/game-in-progress')
    }

    const openConfirm=(sender)=>{
      console.log('received invite')
      if(this.state.inviting === false){
        this.setState({inviting:true})
        confirm({
          title: 'Invite',
          content: `player${sender.name} want to play chess with you?`,
          onOk() {
            console.log(`accept ${sender.name} invite`)
            cSocket.sendReceiveNotice(sender)
            console.log('i want to cry')
            acceptInvite('b',sender)
          },
          onCancel() {
          cSocket.rejectNotice(sender)
          updateInvite(false)
          updateGaming(false)
        },
        }) 
      }
    }

  }
    /*const updateBoard = (data)=>{
      this.setState({chessBoard:data})
    }

    socket.on('receive pm', function(board) {
      console.log(board)
      updateBoard(board)
      updateturn()
    })


    const updateturn=()=>{
      this.setState({turn:!this.state.turn})
    }

    socket.on('not accept', function(sender) {
      updateOpponent('')
      updateInviting(false)
      console.log("game false")
    })

    */

//receive invite



//accept invite as player



  componentWillReceiveProps = (props) => {
    this.setState({
      ...props
    })
  }

  componentDidMount=()=>{
    if(this.state.guestId === ''){
      var tmpName = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 7)
      this.setState({
      invite:false,
      inviting:false});
      this.props.setGuestId(tmpName)
      cSocket.changeUserName(tmpName);
    }
  }


  submitGuestID=()=>{
    //this.props.setGuestId('hahahahaha')
    cSocket.changeUserName(this.state.guestId);
    console.log(this.state.guestId);
  }

  handleCaseChange = (e) => {
    console.log(e.target.value)
    this.props.setGuestId(e.target.value)
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
          /*(this.state.Gamingtime)?
          ( <Content width="80%"> 
              <CustomeGame chessBoard={this.state.chessBoard}  rowCount={6} colCount={5} turn={(this.state.turn)?'a':'b'} 
              player={this.state.player}
              sendBoard={this.sendBoard}/>
              <RuleBoard/>
          </Content>
          ):(*/
          <Content width="80%" style={{minHeight:'1000h', margin: '24px 16px 0',alignItems:'center',display:'flex',justifyContent:'center'}}>
            <Link to='/user-list'><Button type='primary'>joint a game room</Button></Link>&nbsp;
            <Link to='/create-board'><Button type='primary'>Create game</Button></Link>
          </Content>
            //)
        }
        
      <Sider width="200" style={{background: 'white', color: 'black',textAlign:'center',fontSize:20}}>
        <div>
          <div style={{color:'white',textAlign:'center',fontSize:20,color:'black'}}>
          <Row>
            <Input value={this.state.guestId} style={{margin:"10px, 10px 0 10px"}} onChange={this.handleCaseChange}/>
            <Button size="small" onClick={this.submitGuestID} >
              Change Username
            </Button>
          </Row>
          </div>
          <OnlineUserList guestId={this.state.guestId} />
        </div>
      </Sider>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  guestId: state.userStatus.guestId,
})

export default connect(
  mapStateToProps,
  { setGuestId, setGameInfo}
)(MainPage)
