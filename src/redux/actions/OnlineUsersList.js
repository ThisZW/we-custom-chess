import {
    FETCH_ONLINE_USER_LIST
} from '../../constants/ActionTypes'

export const setUserList= onlineUsers => dispatch =>{
    dispatch({
        type:FETCH_ONLINE_USER_LIST,
        onlineUsers
    })
    
}