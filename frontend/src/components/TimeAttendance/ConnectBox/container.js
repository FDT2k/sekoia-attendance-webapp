/*

Links the subject form to the redux store

*/

import React, {Component,useState,useEffect} from 'react';
import _ from 'lodash'
import { useDispatch, useSelector }   from 'react-redux';

import Error from 'components/Error'


const defaultFormValues= {
  api_url: 'http://192.168.13.27:3001',
  host: '192.168.13.250',
  port: '8069',
  database: 'Sekoia4',
  username: 'support@sekoia.ch',
  password: ''
}


const getConfig = ()=>{
  return localStorage.getItem('config');
}


export default (Composed) =>{

  return (props)=> {

    const {authenticate,load_stored_config,check_token,get_users} = props;


    const [formValues, setFormValues]         = useState({});
    const [isLoading,setLoading]              = useState(false);
    const [isAuthenticated,setAuthenticated]  = useState(false);
    const [error, setError]                   = useState(null);

    useEffect(()=>{
      debugger;
      if (Object.keys(formValues).length===0){
        let values = getConfig();
        if(typeof values !== undefined && values !== null){
          setFormValues(Object.assign({},defaultFormValues,JSON.parse(values)))
        }else{
          setFormValues(defaultFormValues)
        }
      }
    })


    const handleSubmit = (values)=>{
      setLoading(true)
      authenticate(values).then(
        result=>{
          localStorage.setItem('config',JSON.stringify(_.omit(values,['password'])))
          localStorage.setItem('token',result.token)
          setAuthenticated(true)
          load_stored_config();
          return get_users();
        }
      ).then(result=>{
        setLoading(false)
        window.location.href='/'

      }).catch(error=>{
        setError(error)
        setLoading(false)
      });
    }
    return (
      <React.Fragment>
        { isLoading && "<h1>Loading</h1>"}

        { !isLoading  && <Composed
          handleSubmit={handleSubmit}
          formValues={formValues}
        />}

        {!isLoading && error && <Error error={error}/>}
      </React.Fragment>
    );
  }

}
