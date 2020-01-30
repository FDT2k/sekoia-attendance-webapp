import React from 'react';
import { ReactComponent as CircleSvg } from '../resources/circle.svg';
import './PinDisplay.css';

export default function PinDisplay(props) {

    const { max = 4, actives } = props;

    const PinIcon = (props) => <div className="pin-icon"><CircleSvg {...props} /></div>

    const icons = [];
    for (let i = 0; i < max; i++) {
        icons.push(<PinIcon key={i} className={i < actives ? "active" : ""} />);
    }

    // Fait la même chose en une ligne, mais c'est moins compréhensible
    // const icons = [...Array(max)].map((x, i) => <PinIcon key={i} className={i < actives ? "active" : ""} />);

    return (
        <div className="pin-display">
            {icons}
        </div>
    )
}
