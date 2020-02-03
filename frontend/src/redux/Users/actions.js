import makeAPI        from '../api'
import resolvePromise from '../async-dispatch';


export const FETCH_USERS        = 'FETCH_USERS';
export const API_ERROR          = 'API_ERROR';
export const TOGGLE_USER        = 'TOGGLE_USER';
export const FETCH_ATTENDANCE   = 'FETCH_ATTENDANCE';

export const api_error              =    error         => ({type:API_ERROR,payload:error})
export const fetch_users            =    users         => ({type:FETCH_USERS,payload:users})
export const _toggle                =    response      => ({type:TOGGLE_USER, payload:response})
export const fetch_attendance       =    response      => ({type:FETCH_ATTENDANCE, payload:response})


const resolveAsyncUsersAction = resolvePromise(api_error)(fetch_users)

const makeAPIFromState = getState => makeAPI(getState().auth.config.api_url,getState().auth.token)

export const get_users = ()=>async (dispatch,getState)=>{
  return dispatch(  resolveAsyncUsersAction( makeAPIFromState(getState).get_users() ))
}



export const toggle = (user_id,pin)=> async (dispatch,getState)=>{
  return dispatch(resolvePromise(api_error)(_toggle)( makeAPIFromState(getState).toggle(user_id,pin) ))
}
