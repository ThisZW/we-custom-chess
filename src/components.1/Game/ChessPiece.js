import React, {Component} from 'react'
import Draggable from 'react-draggable';

class Chess extends Component{
  constructor(props){
    super()
  }

  render(){
    const {row, col, id, chess, player, alive, disabled, rowCount, colCount, square} = this.props

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
        onStop={(evt, drag) => this.props.onStop(evt, drag, id)}
        disabled={disabled}>
        <div className="piece" style={pieceStyle}>
          <img draggable="false" src={`assets/catchthelion/${chess}.png`} style={pieceImgStyle}/>
        </div>
      </Draggable>)
    )
  }
}

export default Chess
