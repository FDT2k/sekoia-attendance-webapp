import makeAPI        from '../api'
import resolvePromise from '../async-dispatch';


export const FETCH_USERS        = 'FETCH_USERS';
export const API_ERROR          = 'API_ERROR';
export const TOGGLE_USER        = 'TOGGLE_USER';
export const FETCH_ATTENDANCE   = 'FETCH_ATTENDANCE';

export const _api_error              =    error                   => ({type:API_ERROR,payload:error})
export const _fetch_users            =    users                   => ({type:FETCH_USERS,payload:users})
export const _toggle                =    response                => ({type:TOGGLE_USER, payload:response})
export const _fetch_attendance      =    user_id => response      => ({type:FETCH_ATTENDANCE, payload:{response,user_id}})


const promiseResolverWithError = resolvePromise(_api_error)

const resolveAsyncUsersAction = promiseResolverWithError(_fetch_users)

const makeAPIFromState = getState => makeAPI(getState().auth.config.api_url,getState().auth.token)

export const get_users = ()=>async (dispatch,getState)=>{
  return dispatch(  resolveAsyncUsersAction( makeAPIFromState(getState).get_users() ))
}



export const toggle = (user_id,pin)=> async (dispatch,getState)=>{
  return dispatch(promiseResolverWithError(_toggle)( makeAPIFromState(getState).toggle(user_id,pin) ))
}


export const get_attendance = (user_id)=>async (dispatch,getState)=>{
  return dispatch(promiseResolverWithError(_fetch_attendance(user_id))( makeAPIFromState(getState).get_attendance(user_id) ))
}
