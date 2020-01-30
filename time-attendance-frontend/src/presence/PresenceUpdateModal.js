import { Modal } from 'antd';
import React from 'react';
import PinPad from './PinPad';
import './PresenceUpdateModal.css';

export default function PresenceUpdateModal(props) {

    const { visible, handleClose, user } = props;

    if (!user) {
        return null;
    }


    // TODO afficher l'avatar
    const { id, firstname, lastname, picture, present } = user;

    const title = `Bienvenue ${firstname} ${lastname}`;

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
            <p>
                Saisissez votre code PIN pour pointer à {present ? 'la' : "l'"}{<b>{present ? 'SORTIE' : 'ENTRÉE'}</b>}
            </p>
            <PinPad pinSize={4} />
        </Modal>
    )
}
