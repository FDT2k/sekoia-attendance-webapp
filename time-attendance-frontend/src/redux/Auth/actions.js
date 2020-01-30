import makeAPI        from '../api'
import resolvePromise from '../async-dispatch';

// defining actions.
export const AUTHENTICATED        = 'AUTHENTICATED';
export const CONFIG        = 'CONFIG';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';


// sync actioncreators
export const load_config         =   config     =>    ({type:CONFIG, payload:config})
export const load_stored_config  =    _         =>    load_config(JSON.parse(localStorage.getItem('config')))
export const authenticated        =   token     =>    ({type:AUTHENTICATED, payload:token})
export const authenticate_failure =   error     =>    ({type:AUTHENTICATE_FAILURE, payload:error})


const resolveAsyncAuthAction = resolvePromise(authenticate_failure)(authenticated)

export const authenticate = (payload)=> {

  return resolveAsyncAuthAction( makeAPI(payload.api_url).authenticate(payload) )

}


export const check_token = ()=>{
    return async (dispatch,getState)=>{
      const token = localStorage.getItem('token');
      if(token){
        return dispatch(resolveAsyncAuthAction( makeAPI(getState().auth.config.api_url,token).authenticated() ))
      }else{
        dispatch(authenticate_failure(new Error('no token found')))
      }
    }

}
