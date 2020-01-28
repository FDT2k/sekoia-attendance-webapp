import React from 'react';
import { Drawer } from 'antd';

export default function LastPresences(props) {
    return (
        <Drawer
            title="Dernières présences"
            placement="right"
            closable={false}
            onClose={props.handleClose}
            visible={props.visible}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}
