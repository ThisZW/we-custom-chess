import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './CatchTheLion.less';
import resizeAware from 'react-resize-aware';
import Draggable from 'react-draggable';

const ResizeAware = resizeAware.default || resizeAware

const initialChessBoard = 
[
  {row: 1, col: 1, chess: "hi", player: "b", alive: true},
  {row: 1, col: 2, chess: "ou", player: "b", alive: true},
  {row: 1, col: 3, chess: "kaku", player: "b", alive: true},
  {row: 2, col: 2, chess: "fu", player: "b", alive: true},
  {row: 3, col: 2, chess: "fu", player: "a", alive: true},
  {row: 4, col: 1, chess: "hi", player: "a", alive: true},
  {row: 4, col: 2, chess: "ou", player: "a", alive: true},
  {row: 4, col: 3, chess: "kaku", player: "a", alive: true},
]


const rowCount = 5
const colCount = 5

const square = 100/colCount

const boxStyles = {
  width: `${square}%`,
  paddingBottom: `${square}%`,
  float: 'left',
  position: 'relative',
  pointerEvents: 'none',
  border: '1px solid black'
}
const highlightBoxStyles = {
  width: `${square}%`,
  paddingBottom: `${square}%`,
  float: 'left',
  position: 'relative',
  pointerEvents: 'none',
  border: '1px solid black',
  boxShadow: 'inset 0px 0px 12px 0px #000000'
}

@CSSModules(styles)
class CatchTheLionBoard extends Component {
  constructor(){
    super()
    this.state = {
      player: null,
      chessBoard : initialChessBoard,
      squareWidth: null,
      isMoving: false,
      selectedBox: {row: 0, col: 0} //by default
    }
  }

  setInitialSquare = (e) => {
    this.setState({
      squareWidth: Math.round(e.state.width/colCount)
    })
  }

  handleResize = (e) => {
    this.setState({
      squareWidth: Math.round(e.width/colCount)
    })
  }

  
  handleDragStart = (evt, drag, id) => {
    this.setState({
      isMoving: true
    })
    return evt
  }

  handleDragStop = (evt, drag, id) => {
    let board = this.state.chessBoard
    let {row, col} = this.state.selectedBox
    board[id].row = row
    board[id].col = col
    //check if something is eaten
    board.forEach((v, i) => {
      if (v.row === row && v.col ===col && i!==id)
        v.alive =false
    })
    
    this.setState({
      chessBoard: board,
      isMoving: false,
      selectedBox: {row: 0, col: 0}
    })
    return evt
  }

  handleDrag = (evt, drag, id) => {
    let offsetCol = drag.x > 0 ? 
      Math.floor((drag.x + this.state.squareWidth/2) / this.state.squareWidth) : 
      Math.ceil((drag.x - this.state.squareWidth/2) / this.state.squareWidth)
    let offsetRow = drag.y > 0 ?
      Math.floor((drag.y + this.state.squareWidth/2) / this.state.squareWidth) : 
      Math.ceil((drag.y - this.state.squareWidth/2) / this.state.squareWidth)
    this.setState({
      selectedBox: {row: offsetRow + this.state.chessBoard[id].row, col: offsetCol + this.state.chessBoard[id].col}
    })
  }

  renderBoxes = () =>{
    let boxes = []
    for(let i=1; i<=rowCount; i++){
      for(let j=1; j<=colCount; j++){
        boxes.push(<div 
          className="board-box"
          key={`${i}-${j}`} 
          style={(this.state.selectedBox.row === i
            && this.state.selectedBox.col === j) ? 
            highlightBoxStyles : boxStyles}/>)
      }
    }
    return boxes
  }

  componentDidMount = () => {

  }

  render(){
    console.log(this.state.chessBoard)
    return (
      <div className="gameContainer">
        <div className="chessboard">
          <ResizeAware
            ref={this.setInitialSquare}
            onlyEvent
            onResize={this.handleResize}
            style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
            {this.renderBoxes()}
            {this.state.chessBoard.map((v,i)=>{
              return <Chess 
              onDrag={this.handleDrag}
              onStart={this.handleDragStart}
              onStop={this.handleDragStop}
              className="piece" 
              key={`piece${i}-${v.row}-${v.col}`} 
              chess={v.chess} player={v.player} 
              row={v.row} col={v.col} id={i} alive={v.alive}/>
            })}
          </ResizeAware>
        </div>
        <div className="results">
          <div className="player-a">a</div>
          <div className="player-b">b</div>
        </div>
      </div>
    )
  }
}


class Chess extends Component{

  constructor(props){
    super()
  }

  render(){
    const {row, col, id, chess, player, alive} = this.props

    const pieceStyle = {
      width: `${square}%`,
      paddingBottom: `${square}%`,
      position: 'absolute',
      padding: `${square*0.05}%`,
      top: `${(row - 1) / rowCount * colCount * square}%`,
      left: `${(col - 1) * square}%`,
    }
    
    const pieceImgStyle = {
      backgroundColor: player === 'a' ? '#007fe14d' : '#1ee1004d',
      transform: player === 'b' ? 'scaleY(-1)' : 'none',
      width: '100%'
    }

    return(
      (alive &&
      <Draggable
        onStart={(evt, drag) => this.props.onStart(evt, drag, id)}
        onDrag={(evt, drag) => this.props.onDrag(evt, drag, id)}
        onStop={(evt, drag) => this.props.onStop(evt, drag, id)}>
        <div className="piece" style={pieceStyle}>
          <img draggable="false" src={`assets/catchthelion/${chess}.png`} style={pieceImgStyle}/>
        </div>
      </Draggable>)
    )
  }
}

export default CatchTheLionBoard