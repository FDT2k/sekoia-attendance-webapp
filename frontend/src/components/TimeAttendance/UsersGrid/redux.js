/*

Links the User grid to the redux store

*/

import React, {useState, useEffect }  from 'react';
import { useDispatch, useSelector }   from 'react-redux';

import Error                          from 'components/Error'
import {Alert}                        from 'antd';
import { get_users }                  from 'redux/Users/actions'
import { check_token }                from 'redux/Auth/actions'
import { userListSelector,makeFilteredUserSelector }           from 'redux/selectors'

export default (Composed) => {
  return (props) => {


    const [isLoading,setLoading]  = useState(false); // loading status
    const [shouldReload,reload]   = useState(false); // never changes but it force useeffect to not fire at everystate change (I need to think about this)
    const [error,setError]        = useState();
    const displayOnlyPresents     = props.displayOnlyPresents || false
    const users                   = useSelector(makeFilteredUserSelector(displayOnlyPresents)) // check out redux selectors

    const isAuthenticated         = useSelector(state=> state.auth ? state.auth.authenticated: false)

    const dispatch                = useDispatch();

    useEffect(()=>{ // fetch the user list
      setLoading(true)
      dispatch(check_token()).then(token=>{
        return dispatch(get_users())
      })
     .then(result=>{
        setLoading(false)
      })
     .catch(res=>{
            setLoading(false)
            setError(res)
          }
      )

    },[])

    return (
      <React.Fragment>

        { isLoading && "Loading" /* displays a loading message while fetching */}

        { !isLoading  && !error && <Composed users={users} />  /* Load the component if everything is fine */}

        { !isLoading && error && <Error error={error}/> /* display an error if needed */}

        { !isAuthenticated &&  <div className="ant-alert ant-alert-warning ant-alert-no-icon">Le client n'est pas configuré. <a href="/configure">Cliquez ici pour configurer</a></div>}

      </React.Fragment>
    );
  }
}
