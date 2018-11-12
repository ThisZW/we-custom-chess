import React, {Component} from 'react'
import CSSModules from 'react-css-modules';
import { Loop, Stage, World } from 'react-game-kit';
import styles from './CatchTheLion.less';


const column = 3
const row = 6

class CatchTheLionBoard extends Component {
  
  generateBoardColAndRow = () =>{
    let result = ""
    for(let i=1; i<=row; i++){
      for(let j=1; j<=column; j++){
        
      }
    }
  }

  render(){
    return (
      <div className="gameContainer">
        <h1>Let's CatchTheLion!</h1>
        <table class="chessboard">
          
        </table>
      </div>
    )
  }
}

class Chess extends Component{
  render(){
    return(
      1
    )
  }
}

export default CSSModules(CatchTheLionBoard, styles)