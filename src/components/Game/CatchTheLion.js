import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './CatchTheLion.module.less';
import resizeAware from 'react-resize-aware';
import Chess from './ChessPiece';

const ResizeAware = resizeAware.default || resizeAware

/*const initialChessBoard = 
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
const colCount = 5*/


@CSSModules(styles)
class CatchTheLionBoard extends Component {
  constructor(props){
    super()
    this.state = {
      player: null,
      chessBoard : props.chessBoard,
      squareWidth: null,
      turn: props.turn,
      isMoving: false,
      square: 100/props.colCount,
      selectedBox: {row: 0, col: 0} //by default
    }
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.colCount !== this.props.colCount)
    this.setState({
      square: 100/this.props.colCount,
    })
  }

  setInitialSquare = (e) => {
    console.log()
    this.setState({
      squareWidth: Math.round(e.state.width/this.props.colCount)
    })
  }

  handleResize = (e) => {
    this.setState({
      squareWidth: Math.round(e.width/this.props.colCount)
    })
  }

  handleDragStart = (evt, drag, id) => {
    this.setState({
      isMoving: true,
    })
    return evt
  }

  handleDragStop = (evt, drag, id) => {
    let board = this.state.chessBoard
    const {row, col} = this.state.selectedBox
    const {rowCount, colCount} = this.props
    
    //check if it is good to move
    if(row <= rowCount && col <=colCount){
      board[id].row = row
      board[id].col = col
      //console.log(row, col) 
    }

    board.forEach((v, i) => {
      if (v.row === row && v.col ===col && i!==id)
        v.alive=false
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
    const {square} = this.state
    const {rowCount, colCount} = this.props

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
    if (this.state.turn !=='both')
    this.setState({
      turn: 'a'
    })
  }

  //**********************
  //  here upload this game board to the sever
  //********************** */
  submitBoard = () =>{
    var tem = this.state.chessBoard
    var saveGame = []
    tem.forEach(function(item) {
      if (item.alive === true){
        saveGame.push(item)
      }
    });
    console.log(saveGame);
  }


  render(){
    //console.log(styles.chessboard)
    return (
      <div className={styles.gameContainer}>
        <div className={styles.chessboard}>
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
              square={this.state.square}
              rowCount={this.props.rowCount}
              colCount={this.props.colCount}
              disabled={this.state.turn !== v.player && this.state.turn !== 'both'}
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

export default CatchTheLionBoard