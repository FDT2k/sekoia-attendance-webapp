import makeAPI        from '../api'
import resolvePromise from '../async-dispatch';


export const FETCH_USERS        = 'FETCH_USERS';
export const API_ERROR        = 'API_ERROR';

export const api_error = error => ({type:API_ERROR,payload:error})
export const fetch_users = users => ({type:FETCH_USERS,payload:users})


const resolveAsyncUsersAction = resolvePromise(api_error)(fetch_users)

export const get_users = ()=>{
    return async (dispatch,getState)=>{
      console.log('yaha',getState().auth.token);
      return dispatch(resolveAsyncUsersAction( makeAPI(getState().auth.config.api_url,getState().auth.token).get_users() ))
    }

}
