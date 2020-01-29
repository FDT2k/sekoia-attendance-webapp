import React, { Component } from 'react';
import KeyPad from './KeyPad';
import PinInput from './PinInput';

export default class PinPad extends Component {

    state = {
        value: ""
    }

    handleClick = (key) => {
        // TODO : gérer le maximum et la soumission lorsqu'atteint
        console.log("key tapée : " + key)

        const oldValue = this.state.value;
        const newValue = key === "C" ? oldValue.slice(0, -1) : oldValue + key;

        this.setState({
            value: newValue
        });
    }

    render() {
        return (
            <div 
                style={{
                    width: "fit-content",
                    margin: "auto"
                }}
            >
                <PinInput max={4} actives={this.state.value.length} />
                <KeyPad handleClick={this.handleClick} />
            </div>
        )
    }
}
