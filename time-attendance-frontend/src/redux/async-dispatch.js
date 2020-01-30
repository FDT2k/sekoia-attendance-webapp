/*
Author: F.Karsegard


resolve a promise using redux-thunk


PayloadResolver is a function resolving your payload,
Reject & ResolveAction creator are the local sync action to dispatch after the promise successfully resolves (or not)
*/




export const makePromiseDispatch = payloadResolver=> errorPayloadResolver =>  RejectActionCreator => ResolveActionCreator =>  (promise,meta={}) =>{
  return async (dispatch,getState)=>{
    try{
      let payload = await promise.then(payloadResolver).catch(errorPayloadResolver);
//      let payload = payloadResolver(result)
      dispatch(ResolveActionCreator(payload,meta));
      return Promise.resolve(payload)
    }catch (error){
      dispatch(RejectActionCreator(error,meta))
      return Promise.reject(error)
    }
  }
}


export const axiosPayloadResolver = payload => {
  return payload.data
}

export const axiosErrorPayloadResolver = (payload) => {
  return Promise.reject(payload.response.data)
}


export default makePromiseDispatch(axiosPayloadResolver)(axiosErrorPayloadResolver);
