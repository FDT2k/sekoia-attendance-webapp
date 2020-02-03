
import {FETCH_USERS,TOGGLE_USER,FETCH_ATTENDANCE} from './actions'

import attendanceReducer from './attendanceReducer'




const replaceUser = (user_id,users,fn)=>{
  let _users = [...users];
  let idx =  _users.findIndex(item=> item.id==user_id);
  if(idx >-1){
      _users[idx]= fn(_users[idx]);
  }
  return _users;
}


export default (state={list:[]},action)=>{


  switch(action.type){
    case FETCH_USERS:
      return {
        list: [...action.payload],
        byIds: action.payload.reduce((acc,value)=>{
            acc[value.id]=value
            return acc;
        },{})

      }

    case TOGGLE_USER:

      return {
        list: replaceUser(action.payload.user_id,state.list,user=>({...user, attendance_state:action.payload.action})),
        byIds: {...state.byIds,[parseInt(action.payload.user_id)]:{...state.byIds[action.payload.user_id], attendance_state:action.payload.action}}
      }
    break;
    case FETCH_ATTENDANCE:
      return {
        ...state,
        attendances: {[action.payload.user_id]:attendanceReducer(state.attendance,action)}
      }

    default:
      return state;
  }
}
