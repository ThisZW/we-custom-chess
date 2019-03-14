import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import styles from '../../styles/CatchTheLion.module.less';
import resizeAware from 'react-resize-aware';
import Chess from './Chess';

const ResizeAware = resizeAware.default || resizeAware

@CSSModules(styles)
class Board extends Component {
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
      console.log("board changed")
            this.setState({chessBoard:nextProps.chessBoard});
            this.forceUpdate();
    }
    if (this.state.turn !== nextProps.turn) {
        console.log("turn changed")
        this.setState({turn:nextProps.turn});
        this.forceUpdate();
      }          
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
    }

    board.forEach((v, i) => {
      if (v.row === row && v.col ===col && i!==id)
        v.alive=false
    })


    console.log(board)

    this.setState({
      chessBoard: board,
      isMoving: false,
      selectedBox: {row: 0, col: 0}
    })
    
    this.submitBoard()

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
      turn: 'a',
      player:this.props.player
    })
  }

  //**********************
  //  here upload this game board to the sever
  //********************** */
  submitBoard = () =>{
    var tem = this.state.chessBoard
    var saveGame = []
    tem.forEach( (item) => {
      if (item.alive === true){
        saveGame.push(item)
      }
    });
    this.props.sendBoard(saveGame)
  }

  render(){
    const {chessBoard, square, turn, player} = this.state
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
            {chessBoard.map((v,i)=>{
              return <Chess 
              onDrag={this.handleDrag}
              onStart={this.handleDragStart}
              onStop={this.handleDragStop}
              className="piece"
              square={square}
              rowCount={this.props.rowCount}
              colCount={this.props.colCount}
              disabled={turn !== v.player && turn !== 'both'}
              key={`piece${i}-${v.row}-${v.col}`} 
              chess={v.chess} player={v.player} 
              row={v.row} col={v.col} id={i} alive={v.alive}/>
            })}
          </ResizeAware>
        </div>
          {/** <Button onClick={this.submitBoard}>Submit</Button> **/}
      </div>
    )
  }
}

export default Board