import React, { Component } from 'react'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="clock">
                <p>{this.state.date.toLocaleTimeString('ch-CH', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
        )
    }
}

export default Clock
