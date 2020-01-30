/*

Links the subject form to the redux store

*/

import React, {Component,useState,useEffect} from 'react';



export default (Composed) =>{

  return (props)=> {


    const [error,setError] = useState();

    const {toggle,pinSize,user} = props;

    const handlePin = (pin,reset) => {
      toggle(user.id,pin).then(
        result => {
          console.log(result)
        }
      ).catch(err=>{
        setError(err.error.message)
        reset();
      })
    }

    return (
      <React.Fragment>
        <Composed
          pinSize={pinSize || 4}
          callback={handlePin}
          error={error}
          />
      </React.Fragment>
    );
  }

}
