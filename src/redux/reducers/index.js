import { combineReducers } from 'redux';
import user from './user/index';
import home from './home/index';
import userStatus, * as fromUserStatus from './userStatus'

const rootReducer = combineReducers({
  userStatus
});

export const getGuestId = state => fromUserStatus.getGuestId(state)

export default rootReducer;