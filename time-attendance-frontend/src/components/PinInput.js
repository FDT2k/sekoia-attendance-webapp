import { Input } from 'antd';
import React, { Component, Fragment } from 'react';
import KeyPad from './KeyPad';

export default class PinInput extends Component {

    state = {
        value: ""
    }

    handleClick = (key) => {
        console.log("key tapée : " + key)
    
        const oldValue = this.state.value;
        const newValue = key === "C" ? oldValue.slice(0, -1) : oldValue + key;

        this.setState({
            value: newValue
        });
    }

    render() {
        return (
            <Fragment>
                <Input.Password // TODO provisoire, remplacé avec des icones jusqu'à 4 max
                    style={{
                        margin: 'auto',
                        // width: '15px'
                    }}
                    size="large"
                    disabled={true}
                    visibilityToggle={false}
                    value={this.state.value} />

                <KeyPad handleClick={this.handleClick} />
            </Fragment>
        )
    }
}
