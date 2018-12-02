import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './CatchTheLion.less';
import resizeAware from 'react-resize-aware';
import Draggable from 'react-draggable';
import { Button } from 'antd'; 
const ResizeAware = resizeAware.default || resizeAware

@CSSModules(styles)
class CatchTheLionBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      player: null,
      chessBoard : [],
      squareWidth: null,
      isMoving: false,
      selectedBox: {row: 0, col: 0},
      rowCount : 5,
      colCount : 5,
      square : 20 //by default
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.state.rowCount !== nextProps.row) {
        this.setState({rowCount:nextProps.row});
        this.forceUpdate();
      }
      if (this.state.colCount !== nextProps.col) {
          this.setState({colCount:nextProps.col,
          square:100/nextProps.col});
          this.forceUpdate();
        }
    if (this.state.chessBoard !== nextProps.chessBoard) {
            this.setState({chessBoard:nextProps.chessBoard});
            this.forceUpdate();
          }

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.rowCount !== prevProps.row) {
      this.setState({rowCount:prevProps.row});
      this.forceUpdate();
    }
    if (this.state.colCount !== prevProps.col) {
        this.setState({colCount:prevProps.col,
        square:100/prevProps.col});
        this.forceUpdate();
      }
    if (this.state.chessBoard !== prevProps.chessBoard) {
        this.setState({chessBoard:prevProps.chessBoard});
        this.forceUpdate();
      }

  }

  setInitialSquare = (e) => {
    this.setState({
      squareWidth: Math.round(e.state.width/this.state.colCount)
    })
  }

  handleResize = (e) => {
    this.setState({
      squareWidth: Math.round(e.width/this.state.colCount)
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
    const boxStyles = {
        width: `${this.state.square}%`,
        paddingBottom: `${this.state.square}%`,
        float: 'left',
        position: 'relative',
        pointerEvents: 'none',
        border: '1px solid black'
      }
      const highlightBoxStyles = {
        width: `${this.state.square}%`,
        paddingBottom: `${this.state.square}%`,
        float: 'left',
        position: 'relative',
        pointerEvents: 'none',
        border: '1px solid black',
        boxShadow: 'inset 0px 0px 12px 0px #000000'
      }
    for(let i=1; i<=this.state.rowCount; i++){
      for(let j=1; j<=this.state.colCount; j++){
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

  //**********************
  //  here upload this game boad to the sever
  //********************** */
  submitBoard=()=>{
    var tem = this.state.chessBoard
    var saveGame = []
    tem.forEach(function(item) {
      if (item.alive === true){
        saveGame.push(item)
      }
    });
    console.log(saveGame);
  }



  componentDidMount = () => {
  }

  render(){
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
              row={v.row} col={v.col} id={i} alive={v.alive} square={this.state.square}
              colCount={this.state.colCount} rowCount={this.state.rowCount}/>
            })}
          </ResizeAware>
        </div>
        <div className="results">
          <div className="player-a">a</div>
          <div className="player-b">b</div>
        </div>
        <Button onClick={this.submitBoard}>Save Game Board</Button>
      </div>
    )
  }
}


class Chess extends Component{

  constructor(props){
    super()
  }
  render(){
    const {row, col, id, chess, player, alive,square,rowCount,colCount} = this.props

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