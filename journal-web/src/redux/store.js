import { combineReducers } from 'redux'
import { createStore } from 'redux'
import LoginInfo from './loginInfo'

const store = createStore(
  combineReducers({
    LoginInfo
  })
);

export default store;
