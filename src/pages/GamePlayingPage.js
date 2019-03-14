import React, {Component} from 'react'
import resizeAware from 'react-resize-aware';
import Board from '../components/chess-board/Board'
import RuleBoard from '../components/chess-board/RuleBoard'
import {Layout} from 'antd';
 
const { Content } = Layout
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
      chessBoard : initialChessBoard,
      turn: null
    }
  }

  render(){
    //console.log(styles.chessboard)
    return (
      <Content width="80%"> 
        <Board chessBoard={this.state.chessBoard}  rowCount={rowCount} colCount={colCount} turn={(this.state.turn)?'a':'b'} 
        player={this.state.player}
        sendBoard={this.sendBoard}/>
        <RuleBoard/>
      </Content>
    )
  }
}

export default GamePlayingPage