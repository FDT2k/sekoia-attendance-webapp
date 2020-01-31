import React      from 'react';
import KeyPad     from './KeyPad';
import PinDisplay from './PinDisplay';

import usePin from './pinHook'


import { useDispatch } from 'react-redux'
import {toggle as toggleActionCreator} from '../redux/Users/actions'


export default function PinPad(props) {

    const { pinSize , user  } = props;


    const dispatch = useDispatch();

    //dispatch the redux action when the pin has been entered
    // REDUX is responsible to update the user state and refresh all the views
    const pinEnteredHandler =     (pin) => dispatch(  toggleActionCreator(user.id,pin) )

    // use the pinHook.
    const { pin,  error,  reset,  handleTypeKey} = usePin(user.id,pinSize,'', pinEnteredHandler)



    return (
        <div
            style={{
                width: "fit-content",
                margin: "auto"
            }}
        >

            {error  && <h1>{error}</h1>}
            <PinDisplay max={pinSize} actives={pin.length} />
            <KeyPad handleClick={handleTypeKey}/>

        </div>
    )
}
