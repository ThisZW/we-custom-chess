import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { Button, Layout,InputNumber,Select  } from 'antd'; 
/* 此处注意，如果使用CSS Module，则必须命名css文件为*.module.css的形式 */
/* More detail can see from https://github.com/codebandits/react-app-rewire-css-modules */
import CustomeGame from './CustomGame';
import Inputs from './Inputs';
import { timingSafeEqual } from 'crypto';

const {Header, Footer, Sider, Content} = Layout;

const Option = Select.Option;
const pieceData = ["kaku", "ou","hi",,"fu"];

class App extends Component {
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
        initialChessBoard :[
  {row: 1, col: 1, chess: "hi", player: "b", alive: true},
  {row: 1, col: 2, chess: "ou", player: "b", alive: true},
  {row: 1, col: 3, chess: "kaku", player: "b", alive: true},
  {row: 2, col: 2, chess: "fu", player: "b", alive: true},
  {row: 3, col: 2, chess: "fu", player: "a", alive: true},
  {row: 4, col: 1, chess: "hi", player: "a", alive: true},
  {row: 4, col: 2, chess: "ou", player: "a", alive: true},
  {row: 4, col: 3, chess: "kaku", player: "a", alive: true},
  {row: 4, col: 3, chess: "kaku", player: "a", alive: true},
        ]
    }

 this.handleColChange = this.handleColChange.bind(this)
 this.handleRowChange = this.handleRowChange.bind(this)

  }
    handleColChange(value){
    this.setState({col: value});
    this.setState({col: value});
    console.log(this.state.col)
    }
    
    handleRowChange(value){
    this.setState({row: value});
    this.setState({row: value});
    console.log(this.state.row)
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
        <Header style={{minHeight:'100h', color: 'white',textAlign: 'center',fontSize:25}}>
          We Custome Chess
        </Header>
        <Layout style={{height:'1000px'}} >
        <Content width="80%">
        <CustomeGame row={this.state.row} col={this.state.col} chessBoard={this.state.initialChessBoard }/>
        </Content>

        <Sider width="20%" style={{background: 'white', color: 'black',textAlign:'center',fontSize:20}}>
        <div>
        <div>Columns : <InputNumber min={1} max={15} defaultValue={5} onChange={this.handleColChange} /></div>
        <div>Rows : <InputNumber min={1} max={15} defaultValue={5} onChange={this.handleRowChange} /></div>
        </div>
        <div>
            Player:
            <Select defaultValue="a" style={{ width: 120 }} onChange={this.handlePlayerChange}>
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

      </Layout>
    );
  }
}
export default hot(module)(App);
