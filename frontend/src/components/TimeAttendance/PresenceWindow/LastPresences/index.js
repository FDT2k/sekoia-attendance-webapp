import React,{useEffect,useState} from 'react';
import { Drawer } from 'antd';

import {useDispatch,useSelector} from 'react-redux';
import {get_attendance} from 'redux/Users/actions'
import {makeAttendanceSelector} from 'redux/selectors'


export const PresenceLine = ({check_in,check_out,date})=>{

  return (<li>{check_in} - {check_out || '-'}  - {date}</li>)
}


export default (props) => {

    const dispatch = useDispatch();


    const load_data = (uid) => dispatch(get_attendance(uid)).catch(console.error)

  //  const [user_id,setUserId] = useState(props.user? props.user.id: undefined)

    const [loadedUser, setLoaded] = useState();

    const attendance_list = useSelector(state=>{
      if(props.user && props.user.id){
        return state.users.attendances[props.user.id] || []
      }

      return []

    })



    useEffect(()=>{
      if( props.user  &&  props.user.id && props.user.id != loadedUser){
      //  console.error('AAAAAAAAAAAAAAH',props.user.id)
      //  load_data(props.user.id)
        load_data(props.user.id);
        setLoaded(props.user.id)

      }
    })

    return (
        <Drawer
            title="Dernières présences"
            placement="right"
            closable={false}
            onClose={props.handleClose}
            visible={props.visible}
        >
        {
          attendance_list.map(
            item => <li key={item.id}>{item.check_in} - {item.check_out}</li>

          )

        }


        </Drawer>
    )
}
