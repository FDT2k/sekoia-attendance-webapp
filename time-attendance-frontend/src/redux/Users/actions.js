import makeAPI        from '../api'
import resolvePromise from '../async-dispatch';


export const FETCH_USERS        = 'FETCH_USERS';
export const API_ERROR          = 'API_ERROR';
export const TOGGLE_USER        = 'TOGGLE_USER';
export const SELECT_USER        = 'SELECT_USER';

export const api_error    =    error         => ({type:API_ERROR,payload:error})
export const fetch_users  =    users         => ({type:FETCH_USERS,payload:users})
export const _toggle      =    response      => ({type:TOGGLE_USER, payload:response})


const resolveAsyncUsersAction = resolvePromise(api_error)(fetch_users)

export const get_users = ()=>{
  return async (dispatch,getState)=>{

    return dispatch(resolveAsyncUsersAction( makeAPI(getState().auth.config.api_url,getState().auth.token).get_users() ))
  }
}


export const toggle = (user_id,pin)=>{
  return async (dispatch,getState)=>{
    return dispatch(resolvePromise(api_error)(_toggle)( makeAPI(getState().auth.config.api_url,getState().auth.token).toggle(user_id,pin) ))
  }
}
