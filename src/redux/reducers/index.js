import { combineReducers } from 'redux';
import user from './user/index';
import home from './home/index';
import userStatus, * as fromUserStatus from './userStatus'
import gameStatus, * as fromGameStatus from './gameStatus'

const rootReducer = combineReducers({
  userStatus,
  gameStatus,
});

export const getGuestId = state => fromUserStatus.getGuestId(state)

export const getGameInfo = state => fromGameStatus.getGameInfo(state)

export default rootReducer;