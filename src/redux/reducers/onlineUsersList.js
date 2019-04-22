import {
    FETCH_ONLINE_USER_LIST
} from '../../constants/ActionTypes'

const initialState = {
    onlineUsers:''
}

const onlineUsers = ( state = initialState, action ) => {
    console.log(action)
    switch(action.type){
        case FETCH_ONLINE_USER_LIST:
            return{
                ...state,
                onlineUsers:action.onlineUsers
            }
        default:
            return state
    }
}

export const getOnlineUsers = state => state.onlineUsers


export default onlineUsers