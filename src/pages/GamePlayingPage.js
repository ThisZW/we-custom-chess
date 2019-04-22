import React, {Component} from 'react'
import resizeAware from 'react-resize-aware';
import Board from '../components/chess-board/Board'
import RuleBoard from '../components/chess-board/RuleBoard'
import {Layout,Button} from 'antd';
import { setGameInfo,updateTurn} from '../redux/actions/Game'
import { connect } from 'react-redux';

import * as cSocket from '../socket/ConfirmSocket'


const { Content,Sider } = Layout
const ResizeAware = resizeAware.default || resizeAware

const initialChessBoard = 
[
  {row: 2, col: 2, chess: "hi", player: "b", alive: true},
  {row: 2, col: 3, chess: "ou", player: "b", alive: true},
  {row: 2, col: 4, chess: "kaku", player: "b", alive: true},
  {row: 3, col: 3, chess: "fu", player: "b", alive: true},
  {row: 4, col: 3, chess: "fu", player: "a", alive: true},
  {row: 5, col: 2, chess: "hi", player: "a", alive: true},
  {row: 5, col: 3, chess: "ou", player: "a", alive: true},
  {row: 5, col: 4, chess: "kaku", player: "a", alive: true},
]

const rowCount = 6
const colCount = 5

class GamePlayingPage extends Component {
  constructor(props){
    super()
    this.state = {
      //把socket加到这里来 然后state send到下面一层去？ [捂脸]
      chessBoard:initialChessBoard,
      opponent: '',
      opponentId:'',
      player: 1,
      turn: true,
      guestId:'',
    }
    cSocket.receiveBoard((err,board) => this.receiveBoard(board))
  }
  
  componentDidMount(){
    var tmp = localStorage.getItem('gameInfo')
    var gameInfo = JSON.parse(tmp)
    console.log(gameInfo)
    this.setState({
      guestId:gameInfo.guestId,
      opponent:gameInfo.opponent,
      opponentId:gameInfo.opponentId,
      player:gameInfo.player,
      turn:(gameInfo.player === 'a')?true:false,
      gamingTime:gameInfo.gamingTime,
      inviting:gameInfo.inviting
    })
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      ...props
    })
  }

  receiveBoard(board){
    this.setState({turn:true})
    this.setState({chessBoard:board})
  }
  
  sendBoard=()=>{
    this.setState({turn:false})
    cSocket.sendBoard(this.state.opponentId,this.state.chessBoard)
  }

  rotateStyle={
    rotation:90
  }


  render(){
    //console.log(styles.chessboard)
    return (
      <Layout style={{height:'1000px'}} >
      <Content width="80%" style={{rotation:45}}> 
        <Board chessBoard={this.state.chessBoard}  rowCount={rowCount} colCount={colCount} turn={(this.state.turn)?'a':'b'} 
        player={this.props.player}
        sendBoard={this.sendBoard}/>
        <RuleBoard/>
        
      </Content>
      <Sider width="200" style={{background: 'white', color: 'black',textAlign:'center',fontSize:20}}>
            <div >
              <div height="200px" style={{height:"200px"}}>
              <div>
              Player 1:
              </div>
              {this.state.guestId}
              </div>
              <div style={{height:"200px"}}>
              <div>player 2:</div>
              {this.state.opponent}</div>
              <div>current turn: {(this.state.turn)? 'you':'opponent'}</div>
            </div>
      </Sider>
        </Layout>
    )
  }
}


const mapStateToProps = state => ({
  chessBoard: state.gameStatus.chessBoard,
  opponent: state.gameStatus.opponent,
  opponentId:state.gameStatus.opponentID,
  player: state.gameStatus.player,
  turn: state.gameStatus.turn,
  guestID:state.userStatus.guestId,
})

export default connect(
  mapStateToProps,
  { setGameInfo,
  updateTurn }
)(GamePlayingPage)
