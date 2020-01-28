import React from 'react';
import { Modal } from 'antd';
import PinInput from './PinInput';

export default function PresenceUpdateModal(props) {

    const { visible, handleClose, user } = props;

    if (!user) {
        return null;
    }

    const title = `Bienvenue ${user.firstname} ${user.lastname}`;

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={handleClose}
            mask={false}
            maskClosable={false}
            footer={null}
        >
            <PinInput />
        </Modal>
    )
}
