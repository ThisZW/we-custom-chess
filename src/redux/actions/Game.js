import {
    GAME_INFO_INIT,
    UPDATE_BOARD_AND_TURN,
} from '../../constants/ActionTypes'

export const setGameInfo = gameStatus => dispatch => {
    console.log(gameInfo)
    dispatch({
        type: GAME_INFO_INIT,
        gameStatus
    })
}

export const updateTurn= turnInfo => dispatch =>{
    console.log(turnInfo)
    dispatch({
        type:UPDATE_BOARD_AND_TURN,
        turnInfo
    })
    
}