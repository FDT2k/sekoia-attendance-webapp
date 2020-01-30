import React, { useState } from 'react';
import KeyPad from './KeyPad';
import PinDisplay from './PinDisplay';

export default function PinPad(props) {

    const {error, pinSize = 4, callback } = props;

    const [pin, setPin] = useState('');

    const handleClick = (key) =>{

      if( pin.length < pinSize || key === 'C') {
        const _pin = key === "C" ? pin.slice(0, -1) : pin + key
        setPin(_pin);
        (callback && _pin.length === pinSize) && callback(_pin, () => setPin('') )
      }
    }

    return (
        <div
            style={{
                width: "fit-content",
                margin: "auto"
            }}
        >

            {error  && <h1>{error}</h1>}
            <PinDisplay max={pinSize} actives={pin.length} />
            <KeyPad handleClick={handleClick} />
        </div>
    )
}
