
import {FETCH_USERS} from './actions'


export default (state={list:[]},action)=>{
  switch(action.type){
    case FETCH_USERS:
      return {list: action.payload}
    default:
      return state;
  }
}
