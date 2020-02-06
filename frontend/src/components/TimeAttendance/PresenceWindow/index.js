import React, { Fragment, useState } from 'react';
import LastPresences from './LastPresences';
import PresenceUpdateModal from './PresenceUpdateModal';

export default function PresenceWindow(props) {

    const [visible, setVisible] = useState(true)

    const handleClose = e => setVisible(false);

    return (
        <Fragment>
            <LastPresences visible={visible} {...props} />
            <PresenceUpdateModal visible={visible} handleClose={handleClose} {...props} />
        </Fragment>
    )
}
