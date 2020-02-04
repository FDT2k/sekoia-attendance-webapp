import React from 'react';
import KeyPad from './KeyPad';
import PinDisplay from './PinDisplay';

export default function PinPad(props) {

    const { pinLength, handleTypeKey } = props;

    return (
        <div
            style={{
                width: "fit-content",
                margin: "auto"
            }}
        >

            <PinDisplay actives={pinLength} />
            <KeyPad handleClick={handleTypeKey} />
        </div>
    )
}
