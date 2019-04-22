import {
    GAME_INFO_INIT,
    UPDATE_BOARD_AND_TURN,
} from '../../constants/ActionTypes'

const initialChessBoard = 
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

const initialState = {
    chessBoard : initialChessBoard,
    opponent:'ok1232',
    opponentID:'123',
    player:'',
    turn:true,

}

const gameStatus = ( state = initialState, action ) => {
    console.log('hello')
    console.log(action.turnInfo)
    console.log('hello')
    switch(action.type){
        case GAME_INFO_INIT:
            return {
                ...state,
                chessBoard: action.gameStatus.chessBoard,
                opponent: action.gameStatus.opponent,
                opponentID:action.gameStatus.opponentID,
                player: action.gameStatus.player,
                turn: action.gameStatus.turn,
            }
        case UPDATE_BOARD_AND_TURN:
            return {
                ...state,
                chessBoard: action.turnInfo.chessBoard,
                opponentID:action.turnInfo.opponentID,
                turn: action.turnInfo.turn,
            }
        default:
            return state
    }
}

export const getGameInfo = state => state.chessBoard

export default gameStatus