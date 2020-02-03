
import {FETCH_USERS} from './actions'


export default (state={list:[]},action)=>{
  switch(action.type){
    case FETCH_USERS:
      return {
        list: [...action.payload],
        byIds: action.payload.reduce((acc,value)=>{
            acc[value.id]=value
            return acc
        },{})

      }
    default:
      return state;
  }
}
