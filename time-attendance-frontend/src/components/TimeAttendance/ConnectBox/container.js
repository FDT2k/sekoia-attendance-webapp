/*

Links the subject form to the redux store

*/

import React, {Component,useState,useEffect} from 'react';
import _ from 'lodash'


const defaultFormValues= {
  api_url: 'http://192.168.13.27:3001',
  host: '192.168.13.250',
  port: '8069',
  database: 'Sekoia4',
  username: 'support@sekoia.ch',
  password: '',
}


const getConfig = ()=>{
  return localStorage.getItem('config');
}


export default (Composed) =>{

  return (props)=> {

    const {authenticate,load_stored_config,check_token} = props;


    const [formValues, setFormValues]         = useState({});
    const [isLoading,setLoading]              = useState(false);
    const [isAuthenticated,setAuthenticated]  = useState(false);
    const [error, setError]                   = useState(null);

    useEffect(()=>{
      if (Object.keys(formValues).length===0){
        let values = getConfig();
        if(typeof values !== undefined && values !== null){
          setFormValues(Object.assign({},defaultFormValues,JSON.parse(values)))
        }
      }
    })


    const handleSubmit = (values)=>{
      authenticate(values).then(
        result=>{
          localStorage.setItem('config',JSON.stringify(_.omit(values,['password'])))
          localStorage.setItem('token',result.token)
          setAuthenticated(true)
          load_stored_config();
      //    window.location.href='/app'
        }
      );
    }
    return (
      <React.Fragment>
        { isLoading && "<h1>Loading</h1>"}

        { !isLoading  && !error && <Composed
          handleSubmit={handleSubmit}
          formValues={formValues}
        />}
      </React.Fragment>
    );
  }

}
