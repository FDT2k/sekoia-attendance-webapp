import React      from 'react';
import KeyPad     from './KeyPad';
import PinDisplay from './PinDisplay';

import usePin from './pinHook'

export default function PinPad(props) {

    const { pinSize  } = props;

    const { pin,  error,  reset,  handleTypeKey } = usePin(2,pinSize,'')

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
