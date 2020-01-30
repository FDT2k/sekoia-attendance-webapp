import React, { useState } from 'react';
import KeyPad from './KeyPad';
import PinDisplay from './PinDisplay';

export default function PinPad(props) {

    const { pinSize = 4 } = props;

    const [pin, setPin] = useState('');

    const handleClick = (key) => setPin(key === "C" ? pin.slice(0, -1) : pin + key);

    return (
        <div
            style={{
                width: "fit-content",
                margin: "auto"
            }}
        >
            <PinDisplay max={pinSize} actives={pin.length} />
            <KeyPad handleClick={handleClick} />
        </div>
    )
}
