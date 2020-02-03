import React, { Fragment } from 'react'
import PresenceUpdateModal from './PresenceUpdateModal'
import LastPresences from './LastPresences'

export default function PresenceWindow(props) {
    return (
        <Fragment>
            <LastPresences {...props} />
            <PresenceUpdateModal  {...props} />
        </Fragment>
    )
}
