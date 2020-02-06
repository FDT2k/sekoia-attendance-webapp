import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {toggle as toggleActionCreator} from 'redux/Users/actions'


/*

handle a pin (or password) state and automatically call a callback when the required length is met
*/

export default (user_id,pinSize=4, initialPin='', onPinEntered) => {


  const [error, setError] = useState();
  const [pin, setPin] = useState('');
  const dispatch = useDispatch()

  const handleTypeKey = (key) =>{
    if( pin.length < pinSize || key === 'C') {
      const _pin = key === "C" ? pin.slice(0, -1) : pin + key
      setPin(_pin);
      (onPinEntered && _pin.length === pinSize) && onPinEntered(_pin,exp)
    }
  }

  const reset = () =>{
    setPin('')
  }

  const toggle = ()=>{
    dispatch(toggleActionCreator(user_id))
  }



  const exp=  {
    pin,
    setPin,
    error,
    reset,
    handleTypeKey,
  }
  return exp
}
