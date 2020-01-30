import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {toggle} from '../redux/Users/actions'

export default (user_id,pinSize=4,initialPin='') => {

  const [error, setError] = useState();
  const [pin, setPin] = useState('');

  const handleTypeKey = (key) =>{
    if( pin.length < pinSize || key === 'C') {
      const _pin = key === "C" ? pin.slice(0, -1) : pin + key
      setPin(_pin);
    }
  }

  const reset = () =>{
    setPin('')
  }

  return {
    pin,
    setPin,
    error,
    reset,
    handleTypeKey
  }
}
