import createStore from '../redux-store';

import {combineReducers} from 'redux'

import AuthReducer from './Auth/reducer'

const reducers =combineReducers({
  auth: AuthReducer
})



export default createStore({})(reducers)
