
import {FETCH_USERS,FETCH_ATTENDANCE} from './actions'



export default (state=[],action)=>{
  switch(action.type){

    case FETCH_ATTENDANCE:
      return [...action.payload.response]
    break
    default:
      return state;
  }
}
