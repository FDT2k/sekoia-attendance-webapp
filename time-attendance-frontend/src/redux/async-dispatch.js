/*
Author: F.Karsegard


resolve a promise using redux-thunk


PayloadResolver is a function resolving your payload,
Reject & ResolveAction creator are the local sync action to dispatch after the promise successfully resolves (or not)
*/




export const makePromiseDispatch = payloadResolver=>   RejectActionCreator => ResolveActionCreator =>  (promise,meta={}) =>{
  return async (dispatch,getState)=>{
    try{
      let result = await promise;
      let payload = payloadResolver(result)
      dispatch(ResolveActionCreator(payload,meta));
      return Promise.resolve(payload)
    }catch (error){
      console.log(error)
      dispatch(RejectActionCreator(error,meta))
      return Promise.reject(error)
    }
  }
}


export const axiosPayloadResolver = payload => payload.data


export default makePromiseDispatch(axiosPayloadResolver);
