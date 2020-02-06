import createStore from '../redux-store';

import {combineReducers} from 'redux'

import AuthReducer from './Auth/reducer'
import UserReducer from './Users/reducer'

const reducers =combineReducers({
  auth: AuthReducer,
  users: UserReducer
})



export default createStore({})(reducers)
