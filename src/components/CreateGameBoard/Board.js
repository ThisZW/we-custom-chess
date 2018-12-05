import React, { Component } from 'react';
import { Button, Layout,InputNumber,Select  } from 'antd'; 
import CustomeGame from './../Game/CatchTheLion';
import Inputs from './Inputs';
import { timingSafeEqual } from 'crypto';
import CSSModules from 'react-css-modules';
import styles from './CreateGameBoard.module.less';

const {Sider, Content} = Layout;

const Option = Select.Option;
const pieceData = ["kaku", "ou","hi",,"fu"];

@CSSModules(styles)
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardname:'',
        ChessBoard:'',
        row: 5,
        col: 5,
        piece: "kaku",
        player: "a",
        alive: true,
        initialChessBoard:[
          {row: 1, col: 1, chess: "hi", player: "b", alive: true},
          {row: 1, col: 2, chess: "ou", player: "b", alive: true},
          {row: 1, col: 3, chess: "kaku", player: "b", alive: true},
          {row: 2, col: 2, chess: "fu", player: "b", alive: true},
          {row: 3, col: 2, chess: "fu", player: "a", alive: true},
          {row: 4, col: 1, chess: "hi", player: "a", alive: true},
          {row: 4, col: 2, chess: "ou", player: "a", alive: true},
          {row: 4, col: 3, chess: "kaku", player: "a", alive: true},
        ]
      }
    this.handleColChange = this.handleColChange.bind(this)
    this.handleRowChange = this.handleRowChange.bind(this)
    }

    handleColChange(value){
      this.setState({col: value});
      console.log(this.state.row, this.state.col)
    }
    
    handleRowChange(value){
      this.setState({row: value});
      console.log(this.state.row, this.state.col)
    }

    handlePlayerChange = (value) => {
        this.setState({
          player: value,
        });
      }

    handlePieceChange = (value) => {
        this.setState({
          piece: value,
        });
      }

    addPiece=()=>{
      var temBoard = this.state.initialChessBoard;
      temBoard.push({row: 1, col: 1, chess: this.state.piece, player: this.state.player, alive: true});
      this.setState({initialChessBoard:temBoard})
    }

  render() {
    const pieceImgStyle = {
        backgroundColor: this.state.player === 'a' ? '#007fe14d' : '#1ee1004d',
        transform: this.state.player === 'b' ? 'scaleY(-1)' : 'none',
        width: '100%'
      }
    
    return (
        <Layout>
          <Content>
            <CustomeGame rowCount={this.state.row} colCount={this.state.col} turn={'both'} chessBoard={this.state.initialChessBoard }/>
          </Content>
          <Sider className={styles.sider}>
            <div>
            <div>Columns: <InputNumber size="small" min={1} max={15} defaultValue={this.state.col} onChange={this.handleColChange} /></div>
            <div>Rows: <InputNumber size="small" min={1} max={15} defaultValue={this.state.row} onChange={this.handleRowChange} /></div>
            </div>
            <div>
            Player:&nbsp;
            <Select defaultValue="a" size="small" style={{ width: 120 }} onChange={this.handlePlayerChange}>
                <Option value="a">A</Option>
                <Option value="b">B</Option>
            </Select> 
            </div>
            <div>
            <Select
              defaultValue={pieceData[0]}
              style={{ width: 120 }}  
              onChange={this.handlePieceChange}
            >
              {pieceData.map(piece => <Option key={piece}>{piece}</Option>)}
            </Select>
            <img src={`assets/catchthelion/${this.state.piece}.png`} style={pieceImgStyle}/>
            </div>
            <Button onClick={this.addPiece}>Add Piece</Button>
          </Sider>
        </Layout>
    );
  }
}
export default Board;
