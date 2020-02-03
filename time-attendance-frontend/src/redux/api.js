
import _axios from 'axios';






export const _authenticate =  axios  => payload =>  axios.post('/authenticate',payload)
export const _authenticated=  axios  => _ =>  axios.get('/authenticate',{})

export const _get_users =  axios  => () =>  axios.get('/users',{})

export const _get_attendance =  axios  =>  user_id =>  axios.get(`/users/${user_id}`,{})

export const _toggle =  axios  =>  (user_id,pin) =>  axios.post(`/toggle/${user_id}`,{pin})


export const makeAPI = (url,token) => {
  const instance = _axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {'x-api-auth': token}
  });

  return {
    authenticate: _authenticate(instance),
    get_users: _get_users(instance),
    get_attendance: _get_attendance(instance),
    toggle: _toggle(instance),
    authenticated:_authenticated(instance)
  }

}


export default makeAPI;
