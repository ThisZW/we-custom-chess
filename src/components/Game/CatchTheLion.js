import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './CatchTheLion.less';
import resizeAware from 'react-resize-aware';
import Draggable from 'react-draggable';

const ResizeAware = resizeAware.default || resizeAware

const initialChessBoard = 
[
  {row: 1, col: 1, chess: "hi", player: "b"},
  {row: 1, col: 2, chess: "ou", player: "b"},
  {row: 1, col: 3, chess: "kaku", player: "b"},
  {row: 2, col: 2, chess: "fu", player: "b"},
  {row: 3, col: 2, chess: "fu", player: "a"},
  {row: 4, col: 1, chess: "hi", player: "a"},
  {row: 4, col: 2, chess: "ou", player: "a"},
  {row: 4, col: 3, chess: "kaku", player: "a"},
]


const row = 10
const col = 10

const square = 100/col

const boxStyles= {
  width: `${square}%`,
  paddingBottom: `${square}%`,
  float: 'left',
  position: 'relative',
  pointerEvents: 'none',
  border: '1px solid black'
}


@CSSModules(styles)
class CatchTheLionBoard extends Component {
  constructor(){
    super()
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.state = {
      player: null,
      chessBoard : initialChessBoard,
    }
  }
  
  handleDragStart = () => {

  }

  handleDragStop = () => {

  }

  handleDrag = () => {

  }

  renderBoxes = () =>{
    let boxes = []
    for(let i=1; i<=col; i++){
      for(let j=1; j<=row; j++){
        boxes.push(<div className="board-box" key={`${i}-${j}`} style={boxStyles} />)
      }
    }
    return boxes
  }

  componentDidMount = () => {
  }

  render(){
    return (
      <div className="gameContainer">
        <h1>Let's CatchTheLion!</h1>
        <div className="chessboard">
          <ResizeAware
            ref={this.setBoardRef}
            onlyEvent
            onResize={this.handleResize}
            style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
            {this.renderBoxes()}
            {this.state.chessBoard.map((v,i)=>{
              return <Chess className="piece" key={`piece-${v.row}-${v.col}`} chess={v.chess} player={v.player} row={v.row} col={v.col}/>
            })}
          </ResizeAware>
        </div>
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
      row: props.row,
      col: props.col,
    }
  }

  getPieceStyle = () => {
    return {
      width: `${square}%`,
      paddingBottom: `${square}%`,
      position: 'absolute',
      padding: `${square*0.05}%`,
      top: `${(this.state.row - 1) / row * col * square}%`,
      left: `${(this.state.col - 1) * square}%`,
    }
  }
  getImgStyle = () => {
    return {
      backgroundColor: this.state.player == 'a' ? '#007fe14d' : '#1ee1004d',
      transform: this.state.player == 'b' ? 'scaleY(-1)' : 'none',
      width: '100%'
    }
  }

  render(){
    return(
      <Draggable
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div className="piece" style={this.getPieceStyle()}>
          <img draggable="false" src={`assets/catchthelion/${this.state.chess}.png`} style={this.getImgStyle()}/>
        </div>
      </Draggable>
    )
  }
}

export default CatchTheLionBoard