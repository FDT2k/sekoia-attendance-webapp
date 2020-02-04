import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { get_attendance, toggle as toggleActionCreator } from 'redux/Users/actions';
import KeyPad from './KeyPad';
import PinDisplay from './PinDisplay';
import usePin from './pinHook';



export default function PinPad(props) {

    const { pinSize, user } = props;

    const dispatch = useDispatch();

    //dispatch the redux action when the pin has been entered
    // REDUX is responsible to update the user state and refresh all the views
    const pinEnteredHandler = (pin) => dispatch(
        toggleActionCreator(user.id, pin)
    ).then(res => {
        return dispatch(get_attendance(user.id))
    })
    .catch(showError).finally(reset)

    // use the pinHook.
    const { pin, reset, handleTypeKey } = usePin(user.id, pinSize, '', pinEnteredHandler)

    const showError = (error) => {
        if (error.code === 401) {
            message.error(error.message);
        } else {
            console.log("Erreur inconnue : " + error)
            message.error("Une erreur inconnue s'est produite")
        }
    };

    return (
        <div
            style={{
                width: "fit-content",
                margin: "auto"
            }}
        >

            <PinDisplay actives={pin.length} />
            <KeyPad handleClick={handleTypeKey} />
        </div>
    )
}
