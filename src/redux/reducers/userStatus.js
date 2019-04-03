import {
    GUEST_ID_GENERATED
} from '../../constants/ActionTypes'

const initialState = {
    guestId : ''
}

const userStatus = ( state = initialState, action ) => {
    console.log(action)
    switch(action.type){
        case GUEST_ID_GENERATED:
            return {
                ...state,
                guestId: action.guestId
            }
        default:
            return state
    }
}

export const getGuestId = state => state.guestId

export default userStatus