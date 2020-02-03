import { Modal } from 'antd';
import React from 'react';
import PinPad from './PinPad';
import './PresenceUpdateModal.css';

import {UserToggleString,UserPic} from 'components/TimeAttendance/UsersGrid/User'

export default function PresenceUpdateModal(props) {

    const { visible, handleClose, user } = props;

    if (!user) {
        return null;
    }


    // TODO afficher l'avatar
    const { id, name, picture, present } = user;

    const title = `Bienvenue ${name}`;

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={handleClose}
            mask={false}
            maskClosable={false}
            footer={null}
            width="fit-content"
            className="presence-update-modal"
        >
          <p style={{textAlign:"center"}}>
            <UserPic user={user}/>
          </p>
          <p>
              Saisissez votre code PIN pour pointer à <UserToggleString user={user}/>
          </p>
          <PinPad user={user}/>
        </Modal>
    )
}
