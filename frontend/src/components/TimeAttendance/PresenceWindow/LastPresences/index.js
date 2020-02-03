import React from 'react';
import { Drawer } from 'antd';



export const PresenceLine = ({check_in,check_out,date})=>{

  return (<li>{check_in} - {check_out || '-'}  - {date}</li>)
}


export default (props) => {
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
