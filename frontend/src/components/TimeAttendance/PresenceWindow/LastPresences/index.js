import React,{useEffect,useState} from 'react';
import { Drawer } from 'antd';

import {useDispatch,useSelector} from 'react-redux';
import {get_attendance} from 'redux/Users/actions'
import {makeAttendanceSelector} from 'redux/selectors'


import FormattedDuration from './FormattedDuration';
import FormattedInOut from './FormattedInOut';

export const PresenceLine = (props)=>{
  const {line}= props;
  const {check_in,check_out,worked_hours,id} = line;


  return (
      <li key={id}>
        <FormattedInOut value={check_in}/>
        {check_out &&<FormattedInOut value={check_out}/>}
        {check_out && <FormattedDuration decimalHours={parseFloat(worked_hours)}/>}
      </li>
  )
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
        load_data(props.user.id);
        setLoaded(props.user.id)
    },[])

    return (
        <Drawer
            title="Dernières présences"
            placement="right"
            closable={false}
            onClose={props.handleClose}
            visible={props.visible}
        >
        <ul className="presences">
        {
          attendance_list.map(
            item => (<PresenceLine line={item}/>)
          )

        }
        </ul>

        </Drawer>
    )
}
