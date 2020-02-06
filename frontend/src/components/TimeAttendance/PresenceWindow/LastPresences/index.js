import { Drawer, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_attendance } from 'redux/Users/actions';
import PresenceGroup from './PresenceGroup';

export default (props) => {

  const dispatch = useDispatch();


  const load_data = (uid) => dispatch(get_attendance(uid)).catch(console.error)

  //  const [user_id,setUserId] = useState(props.user? props.user.id: undefined)

  const [loadedUser, setLoaded] = useState();

  const attendance_list = useSelector(state => {
    if (props.user && props.user.id) {
      return state.users.attendances[props.user.id] || []
    }
    return []
  })

  useEffect(() => {
    load_data(props.user.id);
    setLoaded(props.user.id)
  }, [])

  return (
    <Drawer
      title="Dernières présences"
      placement="right"
      closable={false}
      onClose={props.handleClose}
      visible={props.visible}
      width="25%"
      style={{ minWidth:"fit-content" }}
    >
      <Timeline mode="alternate">
        {attendance_list.map(item => <PresenceGroup key={item.id} item={item} />)}
      </Timeline>
    </Drawer>
  )
}
