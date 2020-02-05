import { message, Modal } from 'antd';
import { UserPic, UserToggleString } from 'components/TimeAttendance/UsersGrid/User';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get_attendance, toggle as toggleActionCreator } from 'redux/Users/actions';
import usePin from './pinHook';
import PinPad from './PinPad';
import FormattedInOut from 'components/TimeAttendance/PresenceWindow/LastPresences/FormattedInOut'
import './PresenceUpdateModal.css';
import moment from 'moment'

export default function PresenceUpdateModal(props) {

    const { visible, handleClose, user, pinSize } = props;

    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    //dispatch the redux action when the pin has been entered
    // REDUX is responsible to update the user state and refresh all the views
    const pinEnteredHandler = (pin) => dispatch(toggleActionCreator(user.id, pin))
        .then(() => dispatch(get_attendance(user.id)))
        .then(() => setSuccess(true))
        .catch(showError)
        .finally(reset)

    // use the pinHook.
    const { pin, reset, handleTypeKey } = usePin(user.id, pinSize, '', pinEnteredHandler)

    const showError = (error) => {
        if (error.code === 401) {
            message.error(error.message);
        } else {
            console.log("Erreur inconnue : " + error)
            message.error("Une erreur inconnue s'est produite")
        }
    };

    const title = `Bienvenue ${user.name}`;

    const successOutContent = (
        <Fragment>
          <div className="confirm">

            <h1>Sortie à {moment().format('HH:mm')}</h1>
            <h1>Au revoir {user.name}</h1>
            <h1>Passez une bonne après-midi !</h1>
         </div>
        </Fragment>
    )

    const successInContent = (
        <Fragment>
          <div className="confirm">

            <h1>Entrée à {moment().format('HH:mm')}</h1>
            <h1>Bonjour {user.name}</h1>
            <h1>Passez une bonne journée !</h1>
         </div>
        </Fragment>
    )

    const pinContent = (
        <Fragment>
            <p>
                Saisissez votre code PIN pour pointer à <UserToggleString user={user} />
            </p>
            <PinPad pinLength={pin.length} handleTypeKey={handleTypeKey} />
        </Fragment>
    )


    const checked_in = user.attendance_state === 'checked_in'
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
            afterClose={props.afterClose} // need to reset success state
        >

            <p style={{ textAlign: "center" }}>
                <UserPic user={user} />
            </p>

            {!success && pinContent}
            {success && checked_in && successInContent}
            {success && !checked_in && successOutContent}
        </Modal>
    )
}
