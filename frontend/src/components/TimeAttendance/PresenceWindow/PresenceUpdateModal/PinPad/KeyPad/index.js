import { Button, Col, Row } from 'antd';
import React from 'react';
import './KeyPad.css';

export default function KeyPad(props) {

    const createLine = (...values) => (
        <Row gutter={[16, 16]}>
            {values.map(val => createButton(val))}
        </Row>
    )

    const createButton = (val) => (
        <Col key={val} span={8}>
            <Button onClick={() => props.handleClick(val)} size="large">
                {val}
            </Button>
        </Col>
    )

    return (
        <div className="key-pad">
            {createLine(1, 2, 3)}
            {createLine(4, 5, 6)}
            {createLine(7, 8, 9)}
            {createLine("C", 0)}
        </div>
    )
}
