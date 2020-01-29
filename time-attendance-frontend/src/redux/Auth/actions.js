import makeAPI from '../../API'

export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';


export const authenticate = (payload)=> {
  return dispatch=> {
      return makeAPI(payload.api_url)
      .authenticate(payload)
      .then (res=> dispatch ({type:AUTHENTICATED,...res.data})
      .catch (res=> dispatch ({type:AUTHENTICATE_FAILURE}))
    )

  }
}
