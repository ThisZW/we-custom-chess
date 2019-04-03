import {
    GUEST_ID_GENERATED
} from '../../constants/ActionTypes'

export const setGuestId = (guestId) => dispatch => {
    dispatch({
        type: GUEST_ID_GENERATED,
        guestId
    })
}