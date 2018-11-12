import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import { Loop, Stage, World } from 'react-game-kit';
import styles from './CatchTheLion.less';


const initialChessBoard = 
{
  11: {
    chess: 'hi',
    player: 'B'
  },
  12: {
    chess: 'ou',
    player: 'B'
  },
  13: {
    chess: 'kaku',
    player: 'B'
  },
  22: {
    chess: 'fu',
    player: 'B'
  },
  32: {
    chess: 'fu',
    player: 'A'
  },
  41: {
    chess: 'hi',
    player: 'A'
  },
  42: {
    chess: 'ou',
    player: 'A'
  },
  43: {
    chess: 'kaku',
    player: 'A'
  },
}


const row = 4
const column = 3

class CatchTheLionBoard extends Component {
  
  constructor(){
    super()
    this.state = {
      player: null,
      chessBoard : initialChessBoard
    }
  }

  generateBoardColAndRow = () =>{
    const board = this.state.chessBoard
    let tr = []
    for(let i=1; i<=row; i++){
      let td = []
      for(let j=1; j<=column; j++){
        let index = i*10+j
        let chess = board.hasOwnProperty(index) ? board[index].chess : 'empty'
        let player = board.hasOwnProperty(index) ? board[index].player : 'empty'
        td.push(
          <Chess chess={chess} player={player} key={index}/>
        )
      }
      tr.push(<tr key={i}>{td}</tr>)
    }
    return tr
  }

  render(){
    return (
      <div className="gameContainer">
        <h1>Let's CatchTheLion!</h1>
        <table class="chessboard">
          {this.generateBoardColAndRow()}
        </table>
      </div>
    )
  }
}

class Chess extends Component{

  constructor(props){
    super()
    this.state = {
      chess: props.chess,
      player: props.player,
    }
  }
  render(){
    return(
      <td class="cell">
        { this.state.chess!= 'empty' &&
        <img class="img" src={`assets/catchthelion/${this.state.chess + this.state.player}.png`}/>
        }
      </td>
    )
  }
}

export default CSSModules(CatchTheLionBoard, styles)