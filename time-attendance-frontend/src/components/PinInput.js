import { Icon } from 'antd';
import React from 'react';
import { ReactComponent as CircleSvg } from '../circle.svg';
import './PinInput.css';

export default function PinInput(props) {

    const PinIcon = (props) => <Icon component={CircleSvg} {...props} />;

    const { max = 4, actives } = props;

    const icons = [];
    for (let i = 0; i < max; i++) {
        icons.push(<PinIcon key={i} className={i < actives ? "active" : ""} />);
    }

    // Fait la même chose en une ligne, mais c'est moins compréhensible
    // const icons = [...Array(max)].map((x, i) => <PinIcon key={i} className={i < actives ? "active" : ""} />);

    return (
        <div className="pin-input-icons">
            {icons}
        </div>
    )
}
