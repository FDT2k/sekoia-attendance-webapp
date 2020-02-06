
import {AUTHENTICATED,AUTHENTICATE_FAILURE,CONFIG} from './actions'


export default (state={},action)=>{
  switch(action.type){
    case AUTHENTICATED:
      return {...state, token: action.payload.token, authenticated:true}
    case AUTHENTICATE_FAILURE:
      return {...state, authenticated:false, error:action.payload};
    case CONFIG:
      return {...state, config:action.payload}
    default:
      return state;
  }
}
