/*
Author: F.Karsegard


resolve a promise using redux-thunk


PayloadResolver is a function resolving your payload,
Reject & ResolveAction creator are the local sync action to dispatch after the promise resolves or not



makePromiseDispatcher = FN<PayloadResolver> => FN <PayloadResolver> => <ActionCreator> => <ResolvedActionCreator> => (Promise, Object={}) => FN<Dispatcher>;



*/

import APIError from './error'


export const makePromiseDispatcher = payloadResolver  => errorPayloadResolver =>  RejectedActionCreator => ResolvedActionCreator =>  (promise,meta={}) =>{
  return async (dispatch,getState)=>{
    try{
      let payload = await promise.then(payloadResolver).catch(errorPayloadResolver);
      dispatch(ResolvedActionCreator(payload,meta));
      return Promise.resolve(payload)
    }catch (error){
      dispatch(RejectedActionCreator(error,meta))
      return Promise.reject(error)
    }
  }
}

export const axiosPayloadResolver = payload => {
  return payload.data
}


/*
  There is two kind of possible error

  Pure error or API Error. This translates API error to normal Error Object with an API Error Type

*/

export const axiosErrorPayloadResolver = (payload) => {
  let response = null
  debugger;
  if(payload.response && payload.response.data){
    const {error} = payload.response.data
    const {name,message,code}  = error;

    response = new APIError(message,code);

  }else{

    response = payload
  }

  return Promise.reject(response) // we need to reject here !!
}


export default makePromiseDispatcher(axiosPayloadResolver)(axiosErrorPayloadResolver);
