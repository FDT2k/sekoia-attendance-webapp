import { message, Modal } from 'antd';
import { UserPic, UserToggleString } from 'components/TimeAttendance/UsersGrid/User';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get_attendance, toggle as toggleActionCreator } from 'redux/Users/actions';
import usePin from './pinHook';
import PinPad from './PinPad';
import './PresenceUpdateModal.css';


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

    let content;

    if (success) {
        content = <Fragment>
            <h1>Au revoir {user.name}</h1>
            <h1>Passez une bonne après-midi !</h1>
        </Fragment>
    } else {
        content = <Fragment>
            <p>
                Saisissez votre code PIN pour pointer à <UserToggleString user={user} />
            </p>
            <PinPad pinLength={pin.length} handleTypeKey={handleTypeKey} />
        </Fragment>
    }

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
            destroyOnClose={true}
        >
            <p style={{ textAlign: "center" }}>
                <UserPic user={user} />
            </p>

            {content}
        </Modal>
    )
}
