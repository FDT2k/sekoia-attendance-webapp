import React,{useEffect} from 'react';
import { Drawer } from 'antd';

import {useDispatch,useSelector} from 'react-redux';
import {get_attendance} from 'redux/Users/actions'
import {makeAttendanceSelector} from 'redux/selectors'


export const PresenceLine = ({check_in,check_out,date})=>{

  return (<li>{check_in} - {check_out || '-'}  - {date}</li>)
}


export default (props) => {

    const dispatch = useDispatch();
/*

    const load_data = () => dispatch(get_attendance(props.user.id)).catch(console.error)

    const get_user_attendances =

    useEffect(()=>{
      if(props.user && props.user.id ){
        load_data()
        const attenedances = useSelector(makeAttendanceSelector(props.user.id))
      }
    })
*/

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
